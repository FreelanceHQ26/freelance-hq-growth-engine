import { Link } from "react-router-dom";
import { Sparkles, Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative mt-32 border-t border-border/60 bg-surface/40">
      <div className="container mx-auto container-px py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4" aria-label="Freelance HQ home">
            <span className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-primary shadow-glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-bold">
              Freelance<span className="text-primary">HQ</span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            Premium, affordable websites for cafés, salons, gyms, startups & creators. Built to convert.
          </p>
          <div className="flex gap-3 mt-6">
            {[Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid place-items-center h-9 w-9 rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-colors"
                aria-label="social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
            <li><Link to="/services" className="hover:text-foreground transition-colors">Services</Link></li>
            <li><Link to="/portfolio" className="hover:text-foreground transition-colors">Portfolio</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-4">Services</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>One Page Website</li>
            <li>Business Website</li>
            <li>E-commerce</li>
            <li>Landing Page</li>
            <li>Maintenance</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> hello@freelancehq.com</li>
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /> +91 98765 43210</li>
            <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" /> Remote · India</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="container mx-auto container-px py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Freelance HQ. All rights reserved.</p>
          <p>Crafted with care for businesses that deserve better.</p>
        </div>
      </div>
    </footer>
  );
};
