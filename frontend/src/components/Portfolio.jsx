import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import Marquee from "@/components/portfolio/Marquee";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import Testimonials from "@/components/portfolio/Testimonials";
import FAQ from "@/components/portfolio/FAQ";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

export default function Portfolio() {
  return (
    <main data-testid="portfolio-root" className="min-h-screen bg-background text-foreground selection:bg-accent">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
