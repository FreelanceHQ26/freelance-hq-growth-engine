import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { services } from "@/components/ServicesGrid";
import { RazorpayPayment } from "@/components/RazorpayPayment";

const Pricing = () => {
  return (
    <>
      <SEO
        title="Pricing — Affordable Web Development"
        description="Transparent pricing for all our web development services. Plans for every budget — from ₹3,999 portfolios to full e-commerce stores."
      />
      <section className="container mx-auto container-px py-12 sm:py-20">
        <SectionHeading
          eyebrow="Pricing"
          title={<>Plans that fit <span className="text-gradient">every budget</span></>}
          description="Honest, upfront pricing. No surprise invoices. Final quote depends on scope, integrations and timeline."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {services.map((s, i) => {
            const featured = s.slug === "business";
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`relative rounded-2xl p-7 border flex flex-col ${
                  featured
                    ? "bg-gradient-primary text-primary-foreground border-transparent shadow-glow"
                    : "bg-gradient-card border-border"
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-full bg-foreground text-background">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-xl font-bold">{s.title}</h3>
                <p className={`text-sm mt-1 ${featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {s.tagline}
                </p>
                <div className="mt-5 font-display text-3xl font-bold">{s.priceRange}</div>
                <ul className="mt-6 space-y-3 flex-1">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className={`text-sm flex items-start gap-2 ${
                        featured ? "text-primary-foreground/90" : "text-muted-foreground"
                      }`}
                    >
                      <Check className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={featured ? "glass" : "hero"}
                  className={`mt-8 w-full rounded-full ${featured ? "text-primary-foreground border-primary-foreground/30" : ""}`}
                >
                  <Link to="/contact">Get Started <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-20 max-w-3xl mx-auto bg-gradient-card border border-border rounded-2xl p-8 text-center">
          <h3 className="font-display text-2xl font-bold">Need something custom?</h3>
          <p className="text-muted-foreground mt-2">
            Web apps, dashboards, integrations — share your idea and we'll quote it within 24 hours.
          </p>
          <Button asChild variant="hero" size="lg" className="mt-6">
            <Link to="/contact">Request Custom Quote</Link>
          </Button>
        </div>
      </section>

      <RazorpayPayment />
    </>
  );
};

export default Pricing;
