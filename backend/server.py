from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from email.message import EmailMessage
import asyncio
import os
import logging
import smtplib
import ssl
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Portfolio API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ContactSubmissionResponse(ContactMessage):
    email_sent: bool = False
    email_status: str = "not_attempted"


class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    subject: Optional[str] = Field(default=None, max_length=200)
    message: str = Field(min_length=1, max_length=5000)


class AnalyticsEvent(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    event: str
    path: Optional[str] = None
    session_id: Optional[str] = None
    referrer: Optional[str] = None
    user_agent: Optional[str] = None
    ip_hash: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class AnalyticsCreate(BaseModel):
    event: str = Field(default="page_view")
    path: Optional[str] = None
    session_id: Optional[str] = None
    referrer: Optional[str] = None


class AnalyticsStats(BaseModel):
    total_views: int
    unique_sessions: int
    total_contacts: int


CONTACT_TO_EMAIL = os.environ.get("CONTACT_TO_EMAIL", "bhupinderk0511@gmail.com")
CONTACT_SMTP_HOST = os.environ.get("CONTACT_SMTP_HOST")
CONTACT_SMTP_PORT = int(os.environ.get("CONTACT_SMTP_PORT", "587"))
CONTACT_SMTP_USERNAME = os.environ.get("CONTACT_SMTP_USERNAME", CONTACT_TO_EMAIL)
CONTACT_SMTP_PASSWORD = os.environ.get("CONTACT_SMTP_PASSWORD")
CONTACT_SMTP_FROM = os.environ.get("CONTACT_SMTP_FROM", CONTACT_SMTP_USERNAME or CONTACT_TO_EMAIL)
CONTACT_SMTP_USE_SSL = os.environ.get("CONTACT_SMTP_USE_SSL", "false").lower() in {"1", "true", "yes"}
CONTACT_SMTP_USE_STARTTLS = os.environ.get("CONTACT_SMTP_USE_STARTTLS", "true").lower() in {"1", "true", "yes"}


def build_contact_email(payload: ContactCreate, message_id: str) -> EmailMessage:
    subject_text = payload.subject.strip() if payload.subject and payload.subject.strip() else f"New enquiry from {payload.name}"

    email = EmailMessage()
    email["Subject"] = f"[Portfolio] {subject_text}"
    email["From"] = CONTACT_SMTP_FROM
    email["To"] = CONTACT_TO_EMAIL
    email["Reply-To"] = payload.email
    email["X-Portfolio-Contact-ID"] = message_id
    email.set_content(
        "\n".join(
            [
                "You received a new contact enquiry from your portfolio site.",
                "",
                f"Name: {payload.name}",
                f"Email: {payload.email}",
                f"Subject: {payload.subject or 'No subject'}",
                "",
                "Message:",
                payload.message,
                "",
                f"Contact ID: {message_id}",
            ]
        )
    )
    return email


def send_contact_email(payload: ContactCreate, message_id: str) -> tuple[bool, str]:
    if not CONTACT_SMTP_HOST:
        logger.warning("Contact email is not configured; skipping outbound email delivery.")
        return False, "disabled"

    email = build_contact_email(payload, message_id)

    try:
        if CONTACT_SMTP_USE_SSL:
            with smtplib.SMTP_SSL(CONTACT_SMTP_HOST, CONTACT_SMTP_PORT, timeout=20) as smtp:
                if CONTACT_SMTP_USERNAME and CONTACT_SMTP_PASSWORD:
                    smtp.login(CONTACT_SMTP_USERNAME, CONTACT_SMTP_PASSWORD)
                smtp.send_message(email)
        else:
            with smtplib.SMTP(CONTACT_SMTP_HOST, CONTACT_SMTP_PORT, timeout=20) as smtp:
                smtp.ehlo()
                if CONTACT_SMTP_USE_STARTTLS:
                    smtp.starttls(context=ssl.create_default_context())
                    smtp.ehlo()
                if CONTACT_SMTP_USERNAME and CONTACT_SMTP_PASSWORD:
                    smtp.login(CONTACT_SMTP_USERNAME, CONTACT_SMTP_PASSWORD)
                smtp.send_message(email)
        return True, "sent"
    except Exception:
        logger.exception("Failed to send contact email for %s", payload.email)
        return False, "failed"


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running"}


@api_router.post("/contact", response_model=ContactSubmissionResponse)
async def create_contact(payload: ContactCreate):
    msg = ContactMessage(**payload.model_dump())
    doc = msg.model_dump()
    await db.contact_messages.insert_one(doc)
    logger.info(f"New contact submission from {msg.email}")
    email_sent, email_status = await asyncio.to_thread(send_contact_email, payload, msg.id)
    return ContactSubmissionResponse(**msg.model_dump(), email_sent=email_sent, email_status=email_status)


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contacts(limit: int = 100):
    items = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return items


@api_router.post("/analytics/track", response_model=AnalyticsEvent)
async def track_event(payload: AnalyticsCreate, request: Request):
    import hashlib
    ip = request.client.host if request.client else ""
    ip_hash = hashlib.sha256(ip.encode()).hexdigest()[:16] if ip else None
    ua = request.headers.get("user-agent", "")[:300]

    evt = AnalyticsEvent(
        **payload.model_dump(),
        user_agent=ua,
        ip_hash=ip_hash,
    )
    await db.analytics_events.insert_one(evt.model_dump())
    return evt


@api_router.get("/analytics/stats", response_model=AnalyticsStats)
async def analytics_stats():
    total_views = await db.analytics_events.count_documents({"event": "page_view"})
    total_contacts = await db.contact_messages.count_documents({})
    unique_sessions = len(await db.analytics_events.distinct("session_id"))
    return AnalyticsStats(
        total_views=total_views,
        unique_sessions=unique_sessions,
        total_contacts=total_contacts,
    )


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
