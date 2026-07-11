import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";
import SectionHeader from "@/components/portfolio/SectionHeader";
import { getApiBaseUrl } from "@/lib/utils";

const API = getApiBaseUrl();

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill name, email and message.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/contact`, form);
      if (data?.email_sent) {
        toast.success("Message sent to my inbox — I'll get back to you soon.");
      } else if (data?.email_status === "disabled") {
        toast.success("Message saved. Email delivery isn't configured yet, so please use the email link above for now.");
      } else {
        toast.success("Message saved, but email delivery hit a snag. Please email me directly if it's urgent.");
      }
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-24 md:py-40 px-5 md:px-10 border-b border-border"
    >
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader index="08" title="Let's Talk" kicker="Open for select projects" />

        <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 flex flex-col justify-between"
          >
            <div>
              <p className="font-display text-3xl md:text-4xl leading-tight tracking-tight">
                Got a project, a role, or a bug that won&apos;t die?
                <span className="text-accent"> Drop a line.</span>
              </p>
              <p className="mt-6 font-mono text-sm text-muted-foreground max-w-md">
                I reply to every message within 24–48 hours. Your note is routed to bhupinderk0511@gmail.com;
                for freelance work, share a brief and a timeline, and for roles, feel free to attach a JD.
              </p>
            </div>

            <div className="mt-10 space-y-4 font-mono text-sm">
              <div className="border-t border-border pt-4">
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Email</div>
                <a href="mailto:bhupinderk0511@gmail.com" data-testid="contact-email-link" className="hover:text-accent break-all">
                  bhupinderk0511@gmail.com
                </a>
              </div>
              <div className="border-t border-border pt-4">
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Phone</div>
                <a href="tel:+918557924030" data-testid="contact-phone-link" className="hover:text-accent">
                  +91 8557924030
                </a>
              </div>
              <div className="border-t border-border pt-4">
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Location</div>
                <div>Punjab, India · UTC+5:30</div>
              </div>
              <div className="border-t border-border pt-4">
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Elsewhere</div>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <a href="https://www.linkedin.com/in/bhupinder-kumar-67b467178/" target="_blank" rel="noreferrer" className="hover:text-accent">LinkedIn ↗</a>
                  <a href="https://github.com/Bhupinder-Kumar" target="_blank" rel="noreferrer" className="hover:text-accent">GitHub ↗</a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            data-testid="contact-form"
            className="md:col-span-7 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Name" name="name" value={form.name} onChange={onChange} testid="contact-input-name" />
              <FormField label="Email" name="email" type="email" value={form.email} onChange={onChange} testid="contact-input-email" />
            </div>
            <FormField label="Subject" name="subject" value={form.subject} onChange={onChange} testid="contact-input-subject" />
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                Message *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                required
                rows={5}
                data-testid="contact-input-message"
                className="w-full bg-transparent border-0 border-b-2 border-border focus:border-accent outline-none py-2 font-mono text-sm resize-none transition-colors"
                placeholder="Tell me about the project…"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              data-testid="contact-submit-button"
              className="group inline-flex items-center gap-3 border-2 border-foreground bg-foreground text-background px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors disabled:opacity-60"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              {loading ? "Sending" : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function FormField({ label, name, value, onChange, type = "text", testid }) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
        {label} {["name", "email"].includes(name) && "*"}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={["name", "email"].includes(name)}
        data-testid={testid}
        className="w-full bg-transparent border-0 border-b-2 border-border focus:border-accent outline-none py-2 font-mono text-sm transition-colors"
      />
    </div>
  );
}
