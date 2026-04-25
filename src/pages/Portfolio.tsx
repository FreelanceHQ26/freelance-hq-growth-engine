import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SEO } from "@/components/SEO";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

const projects = [
  { id: 1, title: "The Loft Café", category: "Café", type: "One Page", img: portfolio1 },
  { id: 2, title: "Pulse Fitness", category: "Gym", type: "Business", img: portfolio2 },
  { id: 3, title: "Maison Beauty", category: "Salon", type: "E-commerce", img: portfolio3 },
  { id: 4, title: "Aarav Visuals", category: "Creator", type: "Portfolio", img: portfolio4 },
  { id: 5, title: "Prismic SaaS", category: "Startup", type: "Landing Page", img: portfolio5 },
  { id: 6, title: "Nova Apparel", category: "Brand", type: "E-commerce", img: portfolio6 },
];

const filters = ["All", "One Page", "Portfolio", "Business", "Landing Page", "E-commerce"];

const Portfolio = () => {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? projects : projects.filter((p) => p.type === active);

  return (
    <>
      <SEO
        title="Portfolio — Recent Web Projects"
        description="Browse our recent web development work for cafés, salons, gyms, creators, startups and brands."
      />
      <section className="container mx-auto container-px py-12 sm:py-20">
        <SectionHeading
          eyebrow="Portfolio"
          title={<>Selected <span className="text-gradient">work</span></>}
          description="A small selection of websites we've shipped for businesses we love."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                active === f
                  ? "bg-gradient-primary text-primary-foreground border-transparent shadow-glow"
                  : "bg-secondary border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={`${p.title} website mockup`}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-display font-bold">{p.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {p.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{p.category}</p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
