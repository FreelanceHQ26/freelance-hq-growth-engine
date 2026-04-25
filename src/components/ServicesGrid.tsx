import { Layers, Briefcase, Building2, Rocket, ShoppingBag, RefreshCw, Wrench, ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export type ServiceItem = {
  slug: string;
  icon: typeof Layers;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  priceRange: string;
};

export const services: ServiceItem[] = [
  {
    slug: "one-page",
    icon: Layers,
    title: "One Page Website",
    tagline: "Single-scroll, high impact",
    description: "Perfect for cafés, salons and small businesses that need a beautiful online presence — fast.",
    features: ["Custom design", "Mobile responsive", "Contact form", "Basic SEO", "3-5 day delivery"],
    priceRange: "₹4,999 – ₹8,999",
  },
  {
    slug: "portfolio",
    icon: Briefcase,
    title: "Portfolio Website",
    tagline: "Showcase your craft",
    description: "Designers, photographers and creators get a stunning portfolio that converts visitors into clients.",
    features: ["Project gallery", "Case studies", "Animated transitions", "About & contact", "Lightning fast"],
    priceRange: "₹3,999 – ₹7,999",
  },
  {
    slug: "business",
    icon: Building2,
    title: "Business Website",
    tagline: "Multi-page authority",
    description: "Multi-page websites for established businesses needing services, blog, team, testimonials and more.",
    features: ["Up to 8 pages", "CMS-ready blog", "Advanced SEO", "Analytics setup", "Premium animations"],
    priceRange: "₹9,999 – ₹18,999",
  },
  {
    slug: "landing-page",
    icon: Rocket,
    title: "Landing Page",
    tagline: "Built to convert",
    description: "High-converting landing pages for product launches, ad campaigns and lead generation.",
    features: ["Conversion-focused copy guidance", "A/B test ready", "Lead capture", "Pixel & analytics", "48-hour delivery"],
    priceRange: "₹5,999 – ₹12,999",
  },
  {
    slug: "ecommerce",
    icon: ShoppingBag,
    title: "E-commerce Website",
    tagline: "Sell online beautifully",
    description: "Full online stores with product catalog, cart, payments and order management.",
    features: ["Product catalog", "Razorpay / Stripe", "Inventory tracking", "Order dashboard", "Marketing-ready"],
    priceRange: "₹14,999 – ₹29,999",
  },
  {
    slug: "redesign",
    icon: RefreshCw,
    title: "Website Redesign",
    tagline: "Modernize & convert",
    description: "Bring your outdated website into 2026 with a complete redesign that performs.",
    features: ["UX audit", "Modern visual design", "Speed optimization", "SEO migration", "Content polish"],
    priceRange: "₹7,999 – ₹19,999",
  },
  {
    slug: "maintenance",
    icon: Wrench,
    title: "Maintenance",
    tagline: "Keep it flawless",
    description: "Monthly care plan: updates, security, backups, content edits and uptime monitoring.",
    features: ["Unlimited small edits", "Security & backups", "Speed monitoring", "Content updates", "Priority support"],
    priceRange: "₹1,999/month",
  },
];

export const ServicesGrid = ({ limit }: { limit?: number }) => {
  const items = limit ? services.slice(0, limit) : services;
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s, i) => (
        <motion.article
          key={s.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          className="group relative bg-gradient-card border border-border rounded-2xl p-7 shadow-card-soft hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="grid place-items-center h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 mb-5 group-hover:bg-gradient-primary group-hover:border-transparent transition-all">
            <s.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
          </div>
          <h3 className="font-display text-xl font-bold mb-2">{s.title}</h3>
          <p className="text-sm text-primary mb-3">{s.tagline}</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">{s.description}</p>
          <ul className="space-y-2">
            {s.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </motion.article>
      ))}
    </div>
  );
};
