import { motion } from "framer-motion";
import SectionHeader from "@/components/portfolio/SectionHeader";
import portfolioImg from "../../assets/images/portfolioImg.PNG";

const facts = [
  { k: "Years", v: "5+" },
  { k: "LMS Modules", v: "8+" },
  { k: "Perf Gain", v: "35%" },
  { k: "SEO Boost", v: "40%" },
];

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative py-24 md:py-40 px-5 md:px-10 border-b border-border"
    >
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader index="02" title="About" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mt-12 md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="md:col-span-5"
          >
            <div className="relative aspect-[4/5] w-full border-2 border-border overflow-hidden group">
              <img
                src={portfolioImg}
                alt="Portrait"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur border-t border-border flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Bhupinder Kumar</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">Frontend Dev</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-7 flex flex-col justify-between"
          >
            <div>
              <p className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight">
                I build <span className="text-accent">interfaces that feel alive</span> — with a bias for
                clarity, speed and the smallest details users never consciously notice.
              </p>
              <p className="mt-8 font-mono text-sm md:text-base leading-relaxed text-muted-foreground max-w-2xl">
                Currently Sr. Frontend Developer at Masters&apos; Union (Venturepact) — shipping a
                Learning Management System with React, TypeScript &amp; Material-UI across web and
                mobile (Capacitor.js). Previously built and revamped Outgrow&apos;s main site, blog and
                the Omniengage product. Focused on accessibility (WCAG 2.1), performance (lazy load,
                code-splitting, memoization) and pixel-perfect design translation.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
              {facts.map((f) => (
                <div key={f.k} className="bg-background p-4 md:p-6" data-testid={`about-fact-${f.k.toLowerCase()}`}>
                  <div className="font-display text-3xl md:text-5xl leading-none">{f.v}</div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {f.k}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
