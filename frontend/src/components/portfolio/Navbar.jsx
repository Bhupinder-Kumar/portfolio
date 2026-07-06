import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Work" },
  { href: "#experience", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      data-testid="site-navbar"
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-colors ${
        scrolled ? "bg-background/80 border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" data-testid="nav-logo" className="flex items-center gap-2 group">
          <span className="w-2.5 h-2.5 bg-accent animate-blink" />
          <span className="font-display text-lg md:text-xl font-bold uppercase tracking-tight">
            Bhupinder<span className="text-accent">.</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="group relative font-mono text-xs uppercase tracking-[0.2em] hover:text-accent transition-colors"
            >
              <span className="text-muted-foreground mr-1">0{i + 1}</span>
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            data-testid="theme-toggle"
            aria-label="Toggle theme"
            className="w-10 h-10 border border-border flex items-center justify-center hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            data-testid="mobile-menu-toggle"
            aria-label="Menu"
            className="md:hidden w-10 h-10 border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-testid="mobile-menu"
            className="md:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="px-5 py-6 flex flex-col gap-4">
              {links.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  data-testid={`mobile-nav-link-${l.label.toLowerCase()}`}
                  className="font-mono text-sm uppercase tracking-[0.2em] hover:text-accent transition-colors flex items-center gap-3"
                >
                  <span className="text-muted-foreground">0{i + 1}</span>
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
