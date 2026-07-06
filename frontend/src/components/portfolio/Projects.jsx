import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/portfolio/SectionHeader";

const projects = [
  {
    n: "01",
    title: "Redux Toolkit Store",
    year: "2025",
    role: "Full build",
    stack: ["React", "Redux Toolkit", "DummyJSON API", "Tailwind"],
    url: "https://ephemeral-choux-453feb.netlify.app/",
    description:
      "A responsive e-commerce catalogue with cart state managed via Redux Toolkit slices, filtering by category, and product cards driven from the DummyJSON REST API.",
    image:
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&q=80&auto=format&fit=crop",
  },
  {
    n: "02",
    title: "DevWithCode Landing",
    year: "2025",
    role: "Design + Build",
    stack: ["HTML5", "CSS3", "JavaScript"],
    url: "https://phenomenal-druid-8a63b1.netlify.app/",
    description:
      "Editorial landing page for a frontend learning brand — with structured roadmap sections, feature grids and a warm, content-forward layout.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80&auto=format&fit=crop",
  },
  {
    n: "03",
    title: "R3 Building Solutions",
    year: "2024",
    role: "Client site",
    stack: ["HTML", "CSS", "JavaScript"],
    url: "https://r3buildingsolutions.netlify.app/",
    description:
      "A business website for a construction and building services company with service pages, project gallery and contact enquiry flow.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format&fit=crop",
  },
  {
    n: "04",
    title: "NFT Store Landing",
    year: "2024",
    role: "Webflow → Code",
    stack: ["HTML", "CSS", "JavaScript"],
    url: "https://webflow-page.netlify.app/",
    description:
      "A pixel-faithful Webflow-inspired NFT marketplace landing page featuring hero, feature grid, step-by-step onboarding tabs and CTA sections.",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80&auto=format&fit=crop",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      data-testid="projects-section"
      className="relative py-24 md:py-40 px-5 md:px-10 border-b border-border"
    >
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader index="04" title="Selected Work" kicker="04 shipped projects" />

        <div className="mt-8 md:mt-16 border-t border-border">
          {projects.map((p, i) => (
            <motion.a
              key={p.n}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              data-testid={`project-link-${p.n}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className="group relative block border-b border-border py-8 md:py-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-1 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  [{p.n}]
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-display font-bold uppercase text-3xl md:text-5xl leading-[0.95] tracking-tight group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>
                </div>
                <div className="md:col-span-4">
                  <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[10px] uppercase tracking-[0.2em] border border-border px-2 py-1"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <div>{p.year}</div>
                  <div className="mt-1">{p.role}</div>
                </div>
                <div className="md:col-span-1 flex md:justify-end">
                  <span className="w-12 h-12 border-2 border-foreground flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground transition-all">
                    <ArrowUpRight
                      size={18}
                      className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                    />
                  </span>
                </div>
              </div>

              {/* Hover preview image */}
              <div className="pointer-events-none absolute right-4 md:right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden lg:block">
                <div className="w-56 h-36 border-2 border-border overflow-hidden shadow-2xl">
                  <img src={p.image} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
