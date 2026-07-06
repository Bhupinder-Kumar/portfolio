from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
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


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running"}


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(payload: ContactCreate):
    msg = ContactMessage(**payload.model_dump())
    doc = msg.model_dump()
    await db.contact_messages.insert_one(doc)
    logger.info(f"New contact submission from {msg.email}")
    return msg


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
