import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LogOut, Plus, Trash2, ExternalLink, ImagePlus } from "lucide-react";
import { SEO } from "@/components/SEO";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { isAdmin, loginAdmin, logoutAdmin } from "@/lib/admin";
import {
  addProject,
  deleteProject,
  fileToDataUrl,
  loadProjects,
  type Project,
} from "@/lib/portfolio-store";

const Portfolio = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [admin, setAdmin] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);

  // login form
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  // upload form
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("Business");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setAdmin(isAdmin());
    setProjects(loadProjects());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(email, pass)) {
      setAdmin(true);
      setLoginOpen(false);
      setEmail("");
      setPass("");
      toast({ title: "Welcome back, admin!" });
    } else {
      toast({
        title: "Invalid credentials",
        description: "Email is not on the allow-list or passphrase is wrong.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setAdmin(false);
    toast({ title: "Logged out" });
  };

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      toast({
        title: "Image too large",
        description: "Please use an image under 4 MB.",
        variant: "destructive",
      });
      return;
    }
    setImage(await fileToDataUrl(file));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !image) {
      toast({ title: "Fill all required fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    addProject({ title, category, type, url: url || undefined, image });
    setProjects(loadProjects());
    setSubmitting(false);
    setUploadOpen(false);
    setTitle("");
    setCategory("");
    setType("Business");
    setUrl("");
    setImage("");
    toast({ title: "Project added", description: "It now appears in your portfolio." });
  };

  const handleDelete = (id: string) => {
    deleteProject(id);
    setProjects(loadProjects());
    toast({ title: "Project removed" });
  };

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
          description="A growing collection of websites we've shipped for businesses we love."
        />

        {/* Admin bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {admin ? (
            <>
              <Button variant="hero" size="default" onClick={() => setUploadOpen(true)} className="rounded-full">
                <Plus className="h-4 w-4" /> Upload Project
              </Button>
              <Button variant="outline" size="default" onClick={handleLogout} className="rounded-full">
                <LogOut className="h-4 w-4" /> Log out
              </Button>
            </>
          ) : (
            <Button
              variant="glass"
              size="sm"
              onClick={() => setLoginOpen(true)}
              className="rounded-full opacity-70 hover:opacity-100"
            >
              <Lock className="h-4 w-4" /> Admin Login
            </Button>
          )}
        </div>

        {/* Grid */}
        <div className="mt-12">
          {projects.length === 0 ? (
            <div className="max-w-xl mx-auto text-center bg-gradient-card border border-border rounded-2xl p-10">
              <div className="grid place-items-center h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 mx-auto mb-4">
                <ImagePlus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold">No projects yet</h3>
              <p className="text-muted-foreground mt-2">
                {admin
                  ? "Upload your first project to start showcasing your work."
                  : "We're putting the finishing touches on our showcase. Check back soon."}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {projects.map((p, i) => (
                  <motion.article
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group relative overflow-hidden rounded-2xl border border-border bg-surface"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-secondary">
                      <img
                        src={p.image}
                        alt={`${p.title} website mockup`}
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
                      <div className="mt-3 flex items-center justify-between gap-2">
                        {p.url ? (
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="text-xs text-primary inline-flex items-center gap-1 hover:underline"
                          >
                            Visit site <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : <span />}
                        {admin && (
                          <button
                            type="button"
                            onClick={() => handleDelete(p.id)}
                            className="text-xs text-destructive inline-flex items-center gap-1 hover:underline"
                          >
                            <Trash2 className="h-3 w-3" /> Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Admin login dialog */}
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Login</DialogTitle>
            <DialogDescription>
              Only allow-listed admins can upload projects.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">Email</Label>
              <Input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@freelancehq.in"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-pass">Passphrase</Label>
              <Input
                id="admin-pass"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Shared admin passphrase"
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit" variant="hero" className="w-full rounded-full">
                Sign in
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Upload dialog */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Upload a project</DialogTitle>
            <DialogDescription>
              Add a recent project to showcase on the portfolio page.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="p-title">Project title *</Label>
              <Input id="p-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="The Loft Café" required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="p-cat">Client / category *</Label>
                <Input id="p-cat" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Café" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="p-type">Type</Label>
                <select
                  id="p-type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {["One Page", "Portfolio", "Business", "Landing Page", "E-commerce", "Redesign"].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="p-url">Live URL (optional)</Label>
              <Input id="p-url" type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p-img">Project image *</Label>
              <Input
                id="p-img"
                type="file"
                accept="image/*"
                onChange={(e) => handleFile(e.target.files?.[0])}
                required={!image}
              />
              {image && (
                <div className="rounded-lg border border-border overflow-hidden mt-2">
                  <img src={image} alt="preview" className="w-full h-40 object-cover" />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" variant="hero" className="w-full rounded-full" disabled={submitting}>
                {submitting ? "Saving…" : "Add project"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Portfolio;
