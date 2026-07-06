import { Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-testid="site-footer" className="relative px-5 md:px-10 py-14 md:py-20">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pb-10">
          <div className="md:col-span-6">
            <a href="#top" className="inline-block">
              <h3 className="font-display font-bold uppercase text-6xl md:text-8xl lg:text-[10vw] leading-[0.85] tracking-tight">
                Bhupinder<span className="text-accent">.</span>
              </h3>
            </a>
            <p className="mt-6 font-mono text-sm text-muted-foreground max-w-md">
              Frontend developer building fast, accessible, motion-rich web experiences. Always open to
              coffee, collaboration and hard problems.
            </p>
          </div>

          <div className="md:col-span-6 grid grid-cols-2 gap-6 md:justify-items-end">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                Navigate
              </div>
              <ul className="space-y-2 font-mono text-sm">
                {["About", "Skills", "Work", "Contact"].map((l) => (
                  <li key={l}>
                    <a href={`#${l.toLowerCase() === "work" ? "projects" : l.toLowerCase()}`} className="hover:text-accent">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                Elsewhere
              </div>
              <ul className="space-y-2 font-mono text-sm">
                <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-accent inline-flex items-center gap-2"><Github size={12}/>GitHub</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-accent inline-flex items-center gap-2"><Linkedin size={12}/>LinkedIn</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-accent inline-flex items-center gap-2"><Twitter size={12}/>Twitter</a></li>
                <li><a href="mailto:hello@bhupinder.dev" className="hover:text-accent inline-flex items-center gap-2"><Mail size={12}/>Email</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <div>© {year} Bhupinder K. All rights reserved.</div>
          <div className="md:text-center">Built with React · Framer Motion · Lenis</div>
          <div className="md:text-right">
            <a href="#top" data-testid="footer-back-to-top" className="inline-flex items-center gap-2 hover:text-accent">
              Back to top <ArrowUp size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
