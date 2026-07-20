import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ThemeProvider } from "@/context/ThemeContext";
import Portfolio from "@/components/Portfolio";
import { getApiBaseUrl } from "@/lib/utils";
import "@/index.css";

const API = getApiBaseUrl();

function useLenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}

function useVisitTracker() {
  useEffect(() => {
    const key = "portfolio_session_id";
    let sid = sessionStorage.getItem(key);
    if (!sid) {
      sid = crypto.randomUUID();
      sessionStorage.setItem(key, sid);
    }
    axios
      .post(`${API}/analytics/track`, {
        event: "page_view",
        path: window.location.pathname,
        session_id: sid,
        referrer: document.referrer || null,
      })
      .catch(() => {});
  }, []);
}

function AppInner() {
  useLenisScroll();
  useVisitTracker();
  return (
    <>
      <Portfolio />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "hsl(var(--card))",
            color: "hsl(var(--card-foreground))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 0,
            fontFamily: "'IBM Plex Mono', monospace",
          },
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="App grain">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppInner />} />
          </Routes>
        </BrowserRouter>
        <SpeedInsights />
      </div>
    </ThemeProvider>
  );
}
