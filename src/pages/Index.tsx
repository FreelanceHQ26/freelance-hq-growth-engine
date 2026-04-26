import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, ShieldCheck, Smartphone, Search, Headphones, Star, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { SectionHeading } from "@/components/SectionHeading";
import { Counter } from "@/components/Counter";
import { ServicesGrid, services } from "@/components/ServicesGrid";
import heroBg from "@/assets/hero-bg.jpg";
import { loadProjects } from "@/lib/portfolio-store";

const reasons = [
  { icon: Zap, title: "Lightning Fast Delivery", text: "Most projects shipped in 3–7 days. No long agency timelines." },
  { icon: ShieldCheck, title: "Honest Pricing", text: "No hidden fees. Transparent quotes that fit local business budgets." },
  { icon: Smartphone, title: "Mobile-First Design", text: "Every site looks stunning on phones — where your customers actually are." },
  { icon: Search, title: "SEO Optimized", text: "Built to rank on Google from day one with clean, semantic structure." },
  { icon: Sparkles, title: "Premium Animations", text: "Smooth, Apple-class motion that makes your brand feel high-end." },
  { icon: Headphones, title: "Real Human Support", text: "Direct WhatsApp access. Fast replies. No ticket queues." },
];

const testimonials = [
  { name: "Aanya Mehta", role: "Owner, The Loft Café", quote: "Our bookings doubled within 3 weeks. The site looks like a million bucks but cost a fraction." },
  { name: "Rohan Kapoor", role: "Founder, Pulse Fitness", quote: "Felt like working with an Apple-level team. Fast, clean, and zero stress." },
  { name: "Priya Nair", role: "Photographer", quote: "My portfolio finally matches my work. Clients now take me seriously." },
];

const faqs = [
  { q: "How long does it take to build my website?", a: "Most one-page and portfolio sites ship in 3–5 days. Business and e-commerce projects typically take 1–3 weeks." },
  { q: "Do I need to provide content and images?", a: "Yes, but we guide you through every step. We can also help with copy polishing and source premium stock visuals." },
  { q: "Will I be able to update the site myself?", a: "Absolutely. We hand off a clean codebase or CMS so you can edit content without touching code." },
  { q: "What about hosting and domain?", a: "We help you set up fast, affordable hosting (Vercel/Netlify) and connect your domain. Hosting starts at ~₹0 for small sites." },
  { q: "Do you offer ongoing maintenance?", a: "Yes — our ₹1,999/month plan covers updates, edits, security and uptime monitoring." },
];

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const previewProjects = loadProjects().slice(0, 3);

  return (
    <>
      <SEO
        title="Affordable Websites That Help Businesses Grow"
        description="Premium, affordable websites for cafés, salons, gyms, startups, creators and local businesses. Get a custom site in days — starting ₹3,999."
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background pointer-events-none" />

        <div className="relative container mx-auto container-px pt-16 pb-24 sm:pt-24 sm:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="h-3 w-3" /> Trusted by 80+ local businesses
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              Affordable Websites <br className="hidden sm:block" />
              That Help Businesses <span className="text-gradient">Grow</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Professional websites for cafés, salons, gyms, startups, creators and local businesses.
              Beautifully designed. Built to convert. Delivered in days.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">Get Free Quote <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link to="/portfolio">View Portfolio</Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              { n: 80, s: "+", l: "Projects" },
              { n: 4, s: ".9★", l: "Avg Rating" },
              { n: 98, s: "%", l: "Client Retention" },
              { n: 5, s: "d", l: "Avg Delivery" },
            ].map((stat) => (
              <div key={stat.l} className="text-center bg-gradient-card border border-border rounded-2xl py-5 px-3">
                <div className="font-display text-3xl sm:text-4xl font-bold text-gradient">
                  <Counter end={stat.n} suffix={stat.s} />
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="container mx-auto container-px py-24">
        <SectionHeading
          eyebrow="Why Freelance HQ"
          title={<>Built for businesses that <span className="text-gradient">demand more</span></>}
          description="We blend agency-grade craft with freelancer speed and prices. The best of both worlds."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-gradient-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-all"
            >
              <div className="grid place-items-center h-11 w-11 rounded-xl bg-primary/10 border border-primary/20 mb-4">
                <r.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="container mx-auto container-px py-24">
        <SectionHeading
          eyebrow="Services"
          title={<>Everything you need to <span className="text-gradient">launch & grow</span></>}
          description="From a single landing page to a full e-commerce store — we build it all."
        />
        <div className="mt-14">
          <ServicesGrid limit={6} />
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="glass" size="lg">
            <Link to="/services">Explore all services <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="container mx-auto container-px py-24">
        <SectionHeading
          eyebrow="Pricing"
          title={<>Honest prices. <span className="text-gradient">No surprises.</span></>}
          description="Transparent quotes that respect your budget. No hidden fees, ever."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {services.slice(0, 3).map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-7 border ${i === 1 ? "bg-gradient-primary text-primary-foreground border-transparent shadow-glow scale-[1.02]" : "bg-gradient-card border-border"}`}
            >
              {i === 1 && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-full bg-foreground text-background">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold">{s.title}</h3>
              <p className={`text-sm mt-1 ${i === 1 ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{s.tagline}</p>
              <div className="mt-5 font-display text-3xl font-bold">{s.priceRange}</div>
              <ul className="mt-6 space-y-2">
                {s.features.map((f) => (
                  <li key={f} className={`text-sm flex items-center gap-2 ${i === 1 ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" /> {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="glass" size="lg">
            <Link to="/pricing">See full pricing <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="container mx-auto container-px py-24">
        <SectionHeading
          eyebrow="Recent work"
          title={<>Crafted with <span className="text-gradient">care</span></>}
          description="A glimpse of what we've shipped recently."
        />
        {previewProjects.length > 0 ? (
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {previewProjects.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface aspect-[4/3]"
              >
                <img
                  src={p.image}
                  alt={`${p.title} project`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="font-display font-bold text-foreground">{p.title}</div>
                  <div className="text-xs text-muted-foreground">{p.category}</div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mt-14 max-w-xl mx-auto text-center bg-gradient-card border border-border rounded-2xl p-10">
            <p className="text-muted-foreground">
              Fresh projects coming soon. Visit the portfolio page for the full showcase.
            </p>
          </div>
        )}
        <div className="mt-12 text-center">
          <Button asChild variant="glass" size="lg">
            <Link to="/portfolio">View all projects <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container mx-auto container-px py-24">
        <SectionHeading
          eyebrow="Loved by clients"
          title={<>What people are <span className="text-gradient">saying</span></>}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-gradient-card border border-border rounded-2xl p-7 flex flex-col"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 text-primary fill-primary" />
                ))}
              </div>
              <blockquote className="text-foreground leading-relaxed flex-1">"{t.quote}"</blockquote>
              <figcaption className="mt-6 pt-6 border-t border-border/60">
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto container-px py-24">
        <SectionHeading
          eyebrow="FAQ"
          title={<>Questions, <span className="text-gradient">answered</span></>}
        />
        <div className="mt-14 max-w-3xl mx-auto space-y-3">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-gradient-card border border-border rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  aria-expanded={open}
                >
                  <span className="font-semibold text-foreground">{f.q}</span>
                  <span className="grid place-items-center h-8 w-8 rounded-full bg-secondary shrink-0">
                    {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="container mx-auto container-px py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-primary p-10 sm:p-16 text-center shadow-glow"
        >
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative">
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-primary-foreground tracking-tight">
              Ready to grow your business online?
            </h2>
            <p className="mt-4 text-primary-foreground/90 text-lg max-w-2xl mx-auto">
              Get a free quote in 24 hours. No commitment, no pressure — just honest advice.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="xl" className="bg-foreground text-background hover:bg-foreground/90 rounded-full">
                <Link to="/contact">Get Free Quote <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="glass" size="xl" className="text-primary-foreground border-primary-foreground/30">
                <Link to="/services">Browse Services</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Index;
