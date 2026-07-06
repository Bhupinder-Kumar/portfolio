import { motion } from "framer-motion";
import SectionHeader from "@/components/portfolio/SectionHeader";

const timeline = [
  {
    period: "2024 — Present",
    role: "Freelance Frontend Developer",
    org: "Independent",
    bullets: [
      "Built and shipped landing pages, marketing sites and small SaaS dashboards for clients across construction, ed-tech and crypto.",
      "Focused on performance (Lighthouse 95+), accessibility and cohesive motion.",
    ],
  },
  {
    period: "2023 — 2024",
    role: "React Developer",
    org: "Contract engagements",
    bullets: [
      "Rebuilt legacy jQuery sites into componentised React apps with Redux Toolkit and Tailwind.",
      "Introduced design tokens and a shared component library to speed up feature velocity.",
    ],
  },
  {
    period: "2022 — 2023",
    role: "Frontend Learner → Junior Dev",
    org: "Self-taught / DevWithCode",
    bullets: [
      "Built 15+ practice projects covering HTML/CSS layouts, JavaScript apps and React fundamentals.",
      "Started publishing tutorials and demos to share the frontend learning journey.",
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      data-testid="experience-section"
      className="relative py-24 md:py-40 px-5 md:px-10 border-b border-border"
    >
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader index="05" title="Journey" kicker="Where I've been" />

        <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-12 space-y-0">
            {timeline.map((t, i) => (
              <motion.div
                key={t.role}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="group grid grid-cols-1 md:grid-cols-12 gap-6 py-8 border-t border-border hover:bg-muted/40 transition-colors"
                data-testid={`experience-item-${i}`}
              >
                <div className="md:col-span-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {t.period}
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-display uppercase text-2xl md:text-3xl leading-tight tracking-tight group-hover:text-accent transition-colors">
                    {t.role}
                  </h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {t.org}
                  </p>
                </div>
                <div className="md:col-span-5">
                  <ul className="space-y-2">
                    {t.bullets.map((b, bi) => (
                      <li key={bi} className="font-mono text-sm text-muted-foreground leading-relaxed flex gap-3">
                        <span className="mt-1.5 w-2 h-2 bg-accent shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </div>
    </section>
  );
}
