import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeader from "@/components/portfolio/SectionHeader";

const faqs = [
  {
    q: "What kind of projects do you take on?",
    a: "I focus on React / TypeScript / Material-UI builds — LMS platforms, admin dashboards, marketing sites, PDF builders and design-system work. If it involves complex UI, motion, or performance work, I'm interested.",
  },
  {
    q: "Are you open to full-time roles or only freelance?",
    a: "Both. I'm currently Sr. Frontend Developer at Masters' Union (Venturepact) and open to selective full-time and contract opportunities — especially remote or Onsite in Punjab/Delhi NCR.",
  },
  {
    q: "What's your typical tech stack?",
    a: "React.js, TypeScript, Redux Toolkit, Material-UI, Tailwind, SCSS. I also use Capacitor.js for cross-platform mobile builds, ApexCharts for data viz, and I'm comfortable with WordPress, Webflow and Shopify when the project calls for it.",
  },
  {
    q: "How do you approach performance and accessibility?",
    a: "Lazy loading, code-splitting, memoization, and image optimisation for perf (I've delivered ~35% render-time gains on real products). For a11y, I follow WCAG 2.1 — semantic markup, keyboard flows, focus states and Lighthouse audits as part of the delivery checklist.",
  },
  {
    q: "How quickly can you start? What are your rates?",
    a: "Availability is usually 1–2 weeks. Rates depend on scope and engagement type (hourly vs project). Share a brief on the contact form and I'll come back with a proposal within 48 hours.",
  },
  {
    q: "Do you work with designers or can you handle design too?",
    a: "Both. I collaborate closely with UX/UI designers and translate Figma into pixel-perfect code. For smaller projects I can also handle the design end-to-end in Figma before implementation.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="relative py-24 md:py-40 px-5 md:px-10 border-b border-border"
    >
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader index="07" title="FAQ" kicker="Common questions" />

        <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-4"
          >
            <p className="font-display text-3xl md:text-4xl leading-tight tracking-tight">
              Answers to the things
              <span className="text-accent"> people usually ask</span> before we work together.
            </p>
            <p className="mt-6 font-mono text-sm text-muted-foreground max-w-md">
              Didn&apos;t find your question here? Drop me a line in the contact section — I reply
              within 24–48 hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-8"
          >
            <Accordion type="single" collapsible className="w-full border-t border-border">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  data-testid={`faq-item-${i}`}
                  className="border-b border-border"
                >
                  <AccordionTrigger
                    data-testid={`faq-trigger-${i}`}
                    className="group py-6 hover:no-underline"
                  >
                    <div className="flex items-start gap-5 text-left">
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground pt-1.5 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-lg md:text-2xl leading-tight tracking-tight group-hover:text-accent transition-colors">
                        {f.q}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent
                    data-testid={`faq-content-${i}`}
                    className="pl-14 pr-4 pb-6"
                  >
                    <p className="font-mono text-sm md:text-[15px] leading-relaxed text-muted-foreground max-w-2xl">
                      {f.a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
