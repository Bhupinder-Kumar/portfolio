import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, FileDown } from "lucide-react";

const RESUME_URL = "https://customer-assets.emergentagent.com/job_dev-interact-hub/artifacts/zct9cj6j_Bhupinder-dev-resume.pdf";
const LINKEDIN_URL = "https://www.linkedin.com/in/bhupinder-kumar-67b467178/";
const GITHUB_URL = "https://github.com/Bhupinder-Kumar";
const EMAIL = "bhupinderk0511@gmail.com";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden pt-24 pb-16 px-5 md:px-10"
    >
      {/* Background texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.09] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div aria-hidden className="absolute top-0 right-0 w-1/2 h-1/2 pointer-events-none">
        <svg className="w-full h-full opacity-20 dark:opacity-30" viewBox="0 0 400 400" fill="none">
          <circle cx="300" cy="120" r="80" stroke="currentColor" strokeWidth="1" />
          <circle cx="300" cy="120" r="120" stroke="currentColor" strokeWidth="1" />
          <circle cx="300" cy="120" r="160" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10 mx-auto max-w-[1600px] w-full">
        {/* Top row: meta */}
        <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-12 gap-4 mb-16 md:mb-24">
          <div className="col-span-1 md:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Portfolio / 2026
            </p>
          </div>
          <div className="hidden md:block md:col-span-6" />
          <div className="col-span-1 md:col-span-3 md:text-right">
            <p className="font-mono text-xs uppercase tracking-[0.25em]">
              <span className="inline-block w-2 h-2 bg-accent animate-blink mr-2 align-middle" />
              Available for hire
            </p>
          </div>
        </motion.div>

        {/* Big name */}
        <motion.h1
          variants={item}
          data-testid="hero-name"
          className="font-display font-bold uppercase leading-[0.85] tracking-[-0.04em] text-[16vw] md:text-[13vw] break-words"
        >
          BHUPINDER<span className="text-accent">.</span>
        </motion.h1>

        {/* Subline row */}
        <motion.div
          variants={item}
          className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-end"
        >
          <div className="md:col-span-7">
            <p className="font-mono text-sm md:text-base leading-relaxed text-muted-foreground max-w-xl">
              <span className="text-foreground">// Sr. Frontend Developer</span> with 4+ years shipping
              React, TypeScript & Material-UI apps — LMS platforms, dashboards, PDF builders and
              pixel-perfect marketing sites.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-wrap items-center justify-start md:justify-end gap-3">
            <a
              href="#projects"
              data-testid="hero-cta-projects"
              className="group inline-flex items-center gap-3 border-2 border-foreground bg-foreground text-background px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors"
            >
              View Work
              <ArrowDown size={14} className="group-hover:rotate-[-45deg] transition-transform" />
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              data-testid="hero-cta-resume"
              className="group inline-flex items-center gap-3 border-2 border-foreground px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
            >
              Resume
              <FileDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Bottom meta bar */}
        <motion.div
          variants={item}
          className="mt-16 md:mt-28 pt-6 border-t border-border grid grid-cols-2 md:grid-cols-12 gap-4 items-center"
        >
          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-1">Based in</p>
            <p className="font-mono text-sm">Punjab, India · UTC+5:30</p>
          </div>
          <div className="hidden md:block md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-1">Focus</p>
            <p className="font-mono text-sm">React · TypeScript · MUI</p>
          </div>
          <div className="hidden md:block md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-1">Experience</p>
            <p className="font-mono text-sm">4+ yrs · LMS · Dashboards</p>
          </div>
          <div className="md:col-span-3 flex items-center gap-3 md:justify-end">
            {[
              { icon: Github, href: GITHUB_URL, label: "github" },
              { icon: Linkedin, href: LINKEDIN_URL, label: "linkedin" },
              { icon: Mail, href: `mailto:${EMAIL}`, label: "mail" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                data-testid={`hero-social-${label}`}
                aria-label={label}
                className="w-9 h-9 border border-border flex items-center justify-center hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <div className="hidden md:flex flex-col items-center gap-2 absolute bottom-8 right-10 z-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
        <div className="w-px h-10 bg-muted-foreground/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-px h-4 bg-accent animate-scroll-hint" />
        </div>
      </div>
    </section>
  );
}
