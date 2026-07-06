import { motion } from "framer-motion";
import SectionHeader from "@/components/portfolio/SectionHeader";

const groups = [
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "HTML5", "CSS3", "SQL"],
  },
  {
    title: "Frameworks",
    items: ["React", "Next.js", "Redux Toolkit", "React Router", "Tailwind CSS"],
  },
  {
    title: "Motion & UI",
    items: ["Framer Motion", "GSAP", "Lenis", "Shadcn/UI", "Radix"],
  },
  {
    title: "Tooling",
    items: ["Vite", "Webpack", "Git", "Figma", "Webflow"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="relative py-24 md:py-40 px-5 md:px-10 border-b border-border"
    >
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader index="03" title="Toolkit" kicker="What I build with" />

        <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {groups.map((g, gi) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: gi * 0.08 }}
              className="bg-background p-6 md:p-8"
              data-testid={`skills-group-${g.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display uppercase text-lg tracking-tight">{g.title}</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  0{gi + 1}
                </span>
              </div>
              <ul className="space-y-3">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="group flex items-center justify-between font-mono text-sm hover:text-accent transition-colors cursor-default"
                  >
                    <span>{it}</span>
                    <span className="w-2 h-2 bg-muted-foreground/40 group-hover:bg-accent transition-colors" />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
