import { motion } from "framer-motion";
import SectionHeader from "@/components/portfolio/SectionHeader";

const timeline = [
  {
    period: "Jan 2023 — Present",
    role: "Sr. Frontend Developer",
    org: "Masters' Union (Venturepact) · Onsite",
    bullets: [
      "Building the Learning Management System with React.js and Material-UI — attendance tracking, course management, session analytics, TV Mode and Capstone modules.",
      "Shipped the LMS mobile app via Capacitor.js for iOS and Android, handling device-specific bugs for stable cross-platform performance.",
      "Implemented a dynamic theme management system across LMS web + mobile, enabling flexible branding and dark/light modes.",
      "Designed the Career Coach Student Dashboard, connecting learners with placement opportunities.",
      "Currently building Reactive Resume — a React + TypeScript resume-builder for interactive, customisable CV creation.",
      "Optimised performance 35% via lazy loading, code-splitting & memoization; built real-time analytics dashboards with ApexCharts.",
    ],
  },
  {
    period: "May 2021 — Dec 2022",
    role: "Web Designer / Frontend Developer",
    org: "Outgrow (Venturepact) · Onsite",
    bullets: [
      "Designed and optimised Outgrow's main website using PHP, Laravel and modern frontend frameworks.",
      "Revamped the WordPress blog — improved UI consistency and cut page load time by 40%.",
      "Built the frontend for a custom PDF Builder with dynamic form rendering for a smoother UX.",
      "Developed Omniengage, a React-based engagement tool, from the ground up.",
      "Improved SEO and accessibility standards across multiple products; mentored interns on CSS architecture and component-driven design.",
    ],
  },
  {
    period: "May 2015 — Dec 2018",
    role: "B.Sc. Computer Science",
    org: "Guru Nanak Dev University, Punjab",
    bullets: [
      "Bachelor of Computer Science — foundations in algorithms, systems and web technologies.",
      "Self-driven exploration of HTML, CSS, JavaScript and React through side projects and open-source builds.",
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
