import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Lightbulb, Target, Users, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { SectionHeading } from "@/components/SectionHeading";
import { Counter } from "@/components/Counter";
import { Button } from "@/components/ui/button";

const values = [
  { icon: Heart, title: "Care First", text: "We treat every client's business like our own. No copy-paste templates." },
  { icon: Lightbulb, title: "Modern Craft", text: "Latest design and dev practices — no outdated WordPress themes." },
  { icon: Target, title: "Conversion Focus", text: "Beautiful is great. But we obsess over results that move your business forward." },
  { icon: Users, title: "Real Partners", text: "Not a faceless agency. You'll know us by name and reach us on WhatsApp." },
];

const About = () => {
  return (
    <>
      <SEO
        title="About — Our Story"
        description="Freelance HQ is a young, modern digital agency helping local businesses, creators and startups grow online with affordable, premium websites."
      />
      <section className="container mx-auto container-px py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
            About us
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight">
            A young agency with <span className="text-gradient">big-agency standards</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Freelance HQ is a modern digital studio helping cafés, salons, gyms, creators and startups
            grow online — without the bloated price tags. We bring agency-grade craft, freelancer
            speed, and pricing that respects your reality.
          </p>
        </motion.div>

        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { n: 80, s: "+", l: "Happy Clients" },
            { n: 120, s: "+", l: "Projects Shipped" },
            { n: 4, s: ".9★", l: "Average Rating" },
            { n: 3, s: "y", l: "Years Crafting" },
          ].map((s) => (
            <div key={s.l} className="text-center bg-gradient-card border border-border rounded-2xl py-6">
              <div className="font-display text-4xl font-bold text-gradient">
                <Counter end={s.n} suffix={s.s} />
              </div>
              <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto container-px py-24">
        <SectionHeading
          eyebrow="What we believe"
          title={<>Our <span className="text-gradient">values</span></>}
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-gradient-card border border-border rounded-2xl p-6"
            >
              <div className="grid place-items-center h-11 w-11 rounded-xl bg-primary/10 border border-primary/20 mb-4">
                <v.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto container-px pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-gradient-card border border-border rounded-3xl p-10 sm:p-14 text-center"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold">Let's build something worth bookmarking.</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Tell us about your business and we'll send back a clear plan and price within 24 hours.
          </p>
          <Button asChild variant="hero" size="xl" className="mt-8">
            <Link to="/contact">Start a Project <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </motion.div>
      </section>
    </>
  );
};

export default About;
