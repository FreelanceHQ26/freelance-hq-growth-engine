import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Message sent! We'll get back within 24 hours.");
    }, 900);
  };

  return (
    <>
      <SEO
        title="Contact — Get a Free Quote"
        description="Get in touch with Freelance HQ for a free website quote. We respond within 24 hours."
      />
      <section className="container mx-auto container-px py-12 sm:py-20">
        <SectionHeading
          eyebrow="Let's talk"
          title={<>Get a free <span className="text-gradient">quote</span></>}
          description="Tell us a bit about your project. We'll reply with a clear plan and price within 24 hours."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-5 max-w-6xl mx-auto">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-4"
          >
            {[
              { icon: Mail, label: "Email", value: "hello@freelancehq.com" },
              { icon: Phone, label: "Phone / WhatsApp", value: "+91 98765 43210" },
              { icon: MapPin, label: "Based in", value: "Remote · India" },
            ].map((c) => (
              <div key={c.label} className="bg-gradient-card border border-border rounded-2xl p-5 flex items-start gap-4">
                <div className="grid place-items-center h-11 w-11 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                  <c.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{c.label}</div>
                  <div className="font-semibold mt-0.5">{c.value}</div>
                </div>
              </div>
            ))}
            <div className="bg-gradient-primary rounded-2xl p-6 text-primary-foreground shadow-glow">
              <h3 className="font-display font-bold text-lg">Average response: 2 hours</h3>
              <p className="text-sm text-primary-foreground/90 mt-1">
                Need it urgent? WhatsApp us — we'll usually reply in minutes.
              </p>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3 bg-gradient-card border border-border rounded-2xl p-6 sm:p-8"
          >
            {submitted ? (
              <div className="py-16 text-center">
                <div className="grid place-items-center h-16 w-16 rounded-full bg-primary/10 border border-primary/20 mx-auto mb-5">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold">Thank you!</h3>
                <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                  Your message landed safely. We'll be in touch within 24 hours.
                </p>
                <Button variant="glass" className="mt-8" onClick={() => setSubmitted(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" name="name" placeholder="Jane Doe" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="business">Business Name</Label>
                    <Input id="business" name="business" placeholder="Acme Café" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+91" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="you@email.com" required />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="grid gap-2">
                    <Label htmlFor="budget">Budget</Label>
                    <Select>
                      <SelectTrigger id="budget"><SelectValue placeholder="Select range" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lt5k">Under ₹5,000</SelectItem>
                        <SelectItem value="5-10">₹5,000 – ₹10,000</SelectItem>
                        <SelectItem value="10-20">₹10,000 – ₹20,000</SelectItem>
                        <SelectItem value="20-50">₹20,000 – ₹50,000</SelectItem>
                        <SelectItem value="50plus">₹50,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Project Type</Label>
                    <Select>
                      <SelectTrigger id="type"><SelectValue placeholder="What do you need?" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="one-page">One Page Website</SelectItem>
                        <SelectItem value="portfolio">Portfolio Website</SelectItem>
                        <SelectItem value="business">Business Website</SelectItem>
                        <SelectItem value="landing">Landing Page</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="redesign">Redesign</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Tell us about your project</Label>
                  <Textarea id="message" name="message" rows={5} placeholder="Goals, deadlines, references…" required />
                </div>
                <Button type="submit" variant="hero" size="lg" className="mt-2 justify-self-start" disabled={loading}>
                  {loading ? "Sending…" : <>Send Message <Send className="h-4 w-4" /></>}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;
