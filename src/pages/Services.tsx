import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { SectionHeading } from "@/components/SectionHeading";
import { ServicesGrid } from "@/components/ServicesGrid";
import { Button } from "@/components/ui/button";

const Services = () => {
  return (
    <>
      <SEO
        title="Web Development Services"
        description="Explore our full range of web development services — from one-page websites and portfolios to e-commerce stores and ongoing maintenance."
      />
      <section className="container mx-auto container-px py-12 sm:py-20">
        <SectionHeading
          eyebrow="Services"
          title={<>Everything you need to <span className="text-gradient">win online</span></>}
          description="Pick a category that fits your goals. Every project includes mobile-first design, SEO basics and a launch checklist."
        />
        <div className="mt-16">
          <ServicesGrid />
        </div>
        <div className="mt-20 text-center">
          <p className="text-muted-foreground mb-6">Not sure what you need? Let's talk.</p>
          <Button asChild variant="hero" size="xl">
            <Link to="/contact">Get a Free Consultation <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Services;
