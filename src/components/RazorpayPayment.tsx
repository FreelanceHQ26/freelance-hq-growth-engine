import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Frontend-only Razorpay launcher.
// IMPORTANT: real payments require a backend that:
//   1. Creates an Order via Razorpay's Orders API (server-side, with secret key)
//   2. Verifies the payment signature after success
// This component opens Razorpay Checkout in "amount only" mode for demo/testing.
// Your friend should swap `key` with the real Key ID and replace the open() call
// with a flow that first hits their backend `/create-order` endpoint and passes
// the returned `order_id` here.

const RAZORPAY_KEY_ID = "rzp_test_REPLACE_ME"; // <-- swap with your test/live Key ID

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const RazorpayPayment = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(amount);
    if (!amt || amt < 1) {
      toast({ title: "Enter a valid amount", variant: "destructive" });
      return;
    }
    if (!window.Razorpay) {
      toast({
        title: "Razorpay not loaded",
        description: "Please refresh the page and try again.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // ── Backend integration point ─────────────────────────────────────────
    // Replace this block with a call to your backend:
    //   const { orderId } = await fetch("/api/razorpay/create-order", {
    //     method: "POST",
    //     body: JSON.stringify({ amount: amt * 100, currency: "INR" }),
    //   }).then(r => r.json());
    // and pass `order_id: orderId` into the options below.
    // ──────────────────────────────────────────────────────────────────────

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: amt * 100, // paise
      currency: "INR",
      name: "Freelance HQ",
      description: note || "Web development services",
      image: "/favicon.ico",
      // order_id: orderId, // uncomment once backend is wired
      prefill: { name, email, contact: phone },
      notes: { project_note: note },
      theme: { color: "#3b82f6" },
      handler: (response: any) => {
        // Send response.razorpay_payment_id (and order_id + signature when using orders)
        // to your backend for verification before marking the payment as complete.
        toast({
          title: "Payment successful",
          description: `Payment ID: ${response.razorpay_payment_id}`,
        });
        setLoading(false);
      },
      modal: {
        ondismiss: () => setLoading(false),
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (resp: any) => {
      toast({
        title: "Payment failed",
        description: resp.error?.description || "Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    });
    rzp.open();
  };

  const presets = [2000, 5000, 10000, 25000];

  return (
    <section id="pay" className="container mx-auto container-px py-16 sm:py-24">
      <SectionHeading
        eyebrow="Pay Online"
        title={<>Secure payment via <span className="text-gradient">Razorpay</span></>}
        description="Pay an advance, milestone or full amount instantly. UPI, cards, net banking and wallets supported."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-12 max-w-2xl mx-auto bg-gradient-card border border-border rounded-2xl p-7 sm:p-9"
      >
        <form onSubmit={handlePay} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="pay-amount">Amount (₹) *</Label>
            <Input
              id="pay-amount"
              type="number"
              min={1}
              step={1}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter custom amount"
              required
              className="h-12 text-lg"
            />
            <div className="flex flex-wrap gap-2 pt-1">
              {presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setAmount(String(p))}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-secondary text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                >
                  ₹{p.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pay-name">Full name</Label>
              <Input id="pay-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pay-phone">Phone</Label>
              <Input id="pay-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 ..." />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pay-email">Email</Label>
            <Input id="pay-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pay-note">Note (project / milestone)</Label>
            <Input id="pay-note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Advance for café website" />
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
            <CreditCard className="h-4 w-4" />
            {loading ? "Opening Razorpay…" : `Pay ${amount ? `₹${Number(amount).toLocaleString("en-IN")}` : "Now"}`}
          </Button>

          <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Secured by Razorpay · 100+ payment methods
          </p>
        </form>
      </motion.div>
    </section>
  );
};
