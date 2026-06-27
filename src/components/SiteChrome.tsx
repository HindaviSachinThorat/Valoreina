import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.button
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20, pointerEvents: show ? "auto" : "none" }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-emerald-brand text-white shadow-lg shadow-emerald-brand/30 hover:bg-emerald-deep transition-colors"
    >
      <ArrowUp className="size-5" />
    </motion.button>
  );
}

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/918830287379?text=Hello%20Valoreina,%20I'd%20like%20to%20request%20an%20export%20quote."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 left-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 hover:scale-110 transition-transform"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </a>
  );
}

export function Particles() {
  const particles = Array.from({ length: 18 });
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <span
          key={i}
          className="absolute block rounded-full bg-gold/40 blur-[1px]"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 100}%`,
            width: `${4 + (i % 4) * 2}px`,
            height: `${4 + (i % 4) * 2}px`,
            animation: `float-particle ${6 + (i % 5)}s ease-in-out ${i * 0.3}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function ScrollProgressLine() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-gradient-to-r from-emerald-brand via-gold to-emerald-brand"
    />
  );
}
