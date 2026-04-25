import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export const WhatsAppButton = () => {
  const phone = "919876543210";
  const message = encodeURIComponent("Hi Freelance HQ! I'd like a free quote for a website.");

  return (
    <motion.a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 grid place-items-center h-14 w-14 rounded-full bg-[hsl(142_70%_45%)] text-white shadow-[0_10px_40px_-10px_hsl(142_70%_45%/0.7)] hover:shadow-[0_10px_50px_-5px_hsl(142_70%_45%/0.9)] transition-shadow"
    >
      <MessageCircle className="h-6 w-6" fill="currentColor" />
      <span className="absolute inset-0 rounded-full animate-ping bg-[hsl(142_70%_45%)] opacity-20" />
    </motion.a>
  );
};
