import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import SectionHeader from "@/components/portfolio/SectionHeader";

const testimonials = [
  {
    quote:
      "Delivered a pixel-perfect rebuild of our marketing site — fast, accessible and easy to maintain. Communication was clear at every step.",
    name: "Alex Ferrera",
    role: "Founder, Studio Anvil",
  },
  {
    quote:
      "Bhupinder has a rare eye for detail. The motion and micro-interactions gave our brand exactly the premium feel we were after.",
    name: "Priya Menon",
    role: "Design Lead, Rooted",
  },
  {
    quote:
      "Shipped ahead of schedule and left the codebase in better shape than we could have. I'd hire him again in a heartbeat.",
    name: "Marco Silva",
    role: "CTO, Boltwave",
  },
];

export default function Testimonials() {
  return (
    <section
      data-testid="testimonials-section"
      className="relative py-24 md:py-40 px-5 md:px-10 border-b border-border"
    >
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader index="06" title="Kind Words" kicker="From past collaborators" />

        <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="bg-background p-8 md:p-10 flex flex-col gap-6 hover:bg-muted/40 transition-colors"
              data-testid={`testimonial-${i}`}
            >
              <Quote className="text-accent" size={28} />
              <blockquote className="font-display text-xl md:text-2xl leading-snug tracking-tight">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto pt-6 border-t border-border">
                <div className="font-mono text-sm">{t.name}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">
                  {t.role}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
