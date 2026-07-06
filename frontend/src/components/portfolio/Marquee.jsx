import FastMarquee from "react-fast-marquee";
import { Star } from "lucide-react";

const words = ["FRONTEND ENGINEER", "REACT", "TYPESCRIPT", "MOTION DESIGN", "ACCESSIBILITY", "PERFORMANCE"];

export default function Marquee() {
  return (
    <section
      data-testid="marquee-section"
      className="border-y border-border py-6 md:py-8 bg-background overflow-hidden"
    >
      <FastMarquee gradient={false} speed={60} pauseOnHover>
        {words.concat(words).map((w, i) => (
          <span
            key={i}
            className="font-display font-bold uppercase text-4xl md:text-6xl px-8 flex items-center gap-8"
          >
            {w}
            <Star size={22} className="text-accent fill-accent" />
          </span>
        ))}
      </FastMarquee>
    </section>
  );
}
