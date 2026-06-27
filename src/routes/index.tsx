import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { motion } from "framer-motion";
import {
  Award, ShieldCheck, Truck, Globe2, Clock, Handshake,
  BadgeCheck, Sparkles, Menu, X, Mail, Linkedin, Instagram,
  CheckCircle2, Star,
  MapPin,
} from "lucide-react";
import { useState } from "react";

import heroFarm from "@/assets/hero-farm.jpg";
import catAgri from "@/assets/cat-agri.jpg";
import catFood from "@/assets/cat-food.jpg";
import catGarments from "@/assets/cat-garments.jpg";
import catHousehold from "@/assets/cat-household.jpg";
import cargoShip from "@/assets/cargo-ship.jpg";
import office from "@/assets/office.jpg";
import quality from "@/assets/quality.jpg";
import logoAsset from "@/assets/valoreina-logo.png.asset.json";

import { InquiryForm } from "@/components/InquiryForm";
import { BackToTop, WhatsAppButton, Particles, ScrollProgressLine } from "@/components/SiteChrome";
import { ThemeToggle } from "@/components/ThemeToggle";

const LOGO_URL = logoAsset.url;
const CONTACT_EMAIL = "info.valoreina@gmail.com";
const CONTACT_ADDRESS = "Wagholi, Pune, Maharashtra 412207, India";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Valoreina | Premium Indian Export Company" },
      {
        name: "description",
        content:
          "Valoreina exports premium agricultural products, spices, food products, garments and household products worldwide. Trusted Indian export and trading company.",
      },
      { name: "keywords", content: "Indian export company, jaggery export, turmeric export, spices export, garments export, household products export, Valoreina" },
      { property: "og:title", content: "Valoreina | Premium Indian Export Company" },
      { property: "og:description", content: "Premium agricultural products, spices, garments and household goods from India to the world." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Valoreina | Premium Indian Export Company" },
      { name: "twitter:description", content: "Premium Indian export and trading company." },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Valoreina",
          description: "Premium Indian export and trading company specializing in agricultural products, food products, spices, garments and household products.",
          url: "/",
          areaServed: ["US", "CA", "GB", "DE", "FR", "NL", "AU", "SG", "AE", "SA"],
          knowsAbout: ["Jaggery", "Turmeric", "Spices", "Onions", "Garments", "Household Products", "Global Trade"],
        }),
      },
    ],
  }),
  component: Home,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};

const productCategories = [
  {
    name: "Agricultural Products",
    tag: "Farm Fresh",
    image: catAgri,
    description: "Jaggery cubes, organic jaggery powder, fresh onions, shallots, garlic, ginger, turmeric, bay leaves, thyme and premium saffron.",
    items: ["Jaggery Cubes", "Organic Jaggery", "Jaggery Powder", "Fresh Onion", "Shallots", "Garlic", "Ginger", "Turmeric", "Bay Leaves", "Saffron"],
  },
  {
    name: "Food Products",
    tag: "Curated Pantry",
    image: catFood,
    description: "Authentic Indian spices, processed foods and shelf-stable dry foods packaged for international markets.",
    items: ["Indian Spices", "Processed Foods", "Dry Foods", "Spice Blends"],
  },
  {
    name: "Garments",
    tag: "Apparel & Accessories",
    image: catGarments,
    description: "Premium women's clothing and fashion accessories crafted with refined fabrics and artisanal detailing.",
    items: ["Women's Clothing", "Fashion Accessories", "Scarves & Stoles", "Ethnic Wear"],
  },
  {
    name: "Household Products",
    tag: "Home Essentials",
    image: catHousehold,
    description: "Electrical appliances, kitchen essentials and everyday home utility products built to international standards.",
    items: ["Electrical Appliances", "Kitchen Essentials", "Home Utility", "Storage Solutions"],
  },
];

const whyUs = [
  { icon: Award, title: "Premium Quality", desc: "Hand-selected sources, batch tested." },
  { icon: BadgeCheck, title: "Competitive Pricing", desc: "Direct from origin, no middlemen." },
  { icon: Handshake, title: "Reliable Suppliers", desc: "Long-standing farmer networks." },
  { icon: ShieldCheck, title: "Export Documentation", desc: "Phytosanitary, COO, FSSAI ready." },
  { icon: Clock, title: "On Time Delivery", desc: "Shipment SLAs you can plan around." },
  { icon: Truck, title: "Worldwide Shipping", desc: "Sea, air, multimodal logistics." },
  { icon: Handshake, title: "Trusted Partnerships", desc: "Decade-long buyer relationships." },
  { icon: Globe2, title: "International Standards", desc: "ISO, HACCP, APEDA aligned." },
];

const qualitySteps = [
  "Supplier Verification",
  "Product Inspection",
  "Quality Testing",
  "Premium Packaging",
  "Container Loading",
  "Shipping & Tracking",
  "Global Delivery",
];

const countries = [
  "United States", "Canada", "United Kingdom", "Germany", "France",
  "Netherlands", "Australia", "Singapore", "United Arab Emirates",
  "Saudi Arabia", "South Africa", "Kenya",
];

const stats = [
  { value: "50+", label: "Product Categories" },
  { value: "100%", label: "Quality Checked" },
  { value: "24/7", label: "Customer Support" },
  { value: "Global", label: "Export Network" },
];

const testimonials = [
  { quote: "Excellent quality and consistent supply. Valoreina has become our default sourcing partner for premium jaggery and spices.", author: "Procurement Director", country: "United Arab Emirates" },
  { quote: "Professional export service with impeccable documentation. Every shipment has cleared customs without a single delay.", author: "Import Manager", country: "Canada" },
  { quote: "Reliable supplier with international standards. Their quality control is exactly what European retail buyers demand.", author: "Sourcing Head", country: "Germany" },
];

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#products", label: "Products" },
  { href: "#process", label: "Process" },
  { href: "#global", label: "Global" },
  { href: "#contact", label: "Contact" },
];

function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-background text-foreground font-sans">
      <Toaster position="top-center" richColors />
      <ScrollProgressLine />

      {/* Navigation */}
      <nav className="fixed top-0 z-40 w-full">
        <div className="mx-auto max-w-7xl px-6 mt-3">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] sm:flex items-center justify-between gap-4 rounded-full bg-background/80 backdrop-blur-xl ring-1 ring-border px-5 py-3 shadow-sm">
            <a href="#top" className="flex items-center gap-2.5 min-w-0">
              <img src={LOGO_URL} alt="Valoreina logo" width={40} height={40} className="h-9 w-9 shrink-0 rounded-full object-contain" />
              <span className="font-serif text-lg tracking-tight truncate">Valoreina</span>
            </a>
            <div className="hidden md:flex items-center gap-7 text-sm">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="text-muted-foreground hover:text-emerald-brand transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <ThemeToggle />
              <a href="#contact" className="hidden sm:inline-flex items-center text-xs font-medium px-4 py-2 rounded-full bg-emerald-brand text-white hover:bg-emerald-deep transition-colors">
                Get Quote
              </a>
              <button className="md:hidden grid h-9 w-9 place-items-center rounded-full ring-1 ring-border" onClick={() => setOpen(!open)} aria-label="Menu">
                {open ? <X className="size-4" /> : <Menu className="size-4" />}
              </button>
            </div>
          </div>
          {open && (
            <div className="md:hidden mt-2 rounded-2xl bg-background/95 backdrop-blur-xl ring-1 ring-border p-4 flex flex-col gap-3 text-sm">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-muted-foreground hover:text-emerald-brand">
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section id="top" className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0">
          <img src={heroFarm} alt="Indian farmland at golden hour" width={1920} height={1280} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep/85 via-emerald-deep/70 to-emerald-deep/95" />
        </div>
        <Particles />
        <div className="relative mx-auto max-w-7xl px-6 w-full">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20 text-white/90 text-xs uppercase tracking-[0.18em] mb-6">
              <Sparkles className="size-3 text-gold" /> Indian Export &amp; Trading Company
            </span>
            <h1 className="font-serif text-white text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] tracking-tight text-balance">
              Exporting India's Finest <em className="text-gold not-italic">Agricultural</em> &amp; Lifestyle Products Worldwide
            </h1>
            <p className="mt-8 text-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
              Premium quality. Trusted suppliers. Global shipping. Reliable partnerships — from the farms of India to your distribution centers across the world.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#products" className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-emerald-deep font-medium text-sm hover:bg-gold-soft transition-colors">
                Explore Products
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full ring-1 ring-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors">
                Contact Us
              </a>
            </div>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
              {["Premium Quality", "Trusted Suppliers", "Global Shipping", "Reliable Partnerships"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-white/80 text-xs uppercase tracking-wider">
                  <CheckCircle2 className="size-4 text-gold shrink-0" /> {t}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-border bg-beige py-8">
        <div className="mx-auto max-w-7xl px-6 flex flex-wrap items-center justify-between gap-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {["FSSAI Certified", "APEDA Member", "ISO 22000", "HACCP", "IEC Registered", "Spices Board"].map((c) => (
            <span key={c} className="font-serif text-base text-emerald-brand">{c}</span>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 px-6">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <span className="text-xs uppercase tracking-[0.2em] text-gold">About Valoreina</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 text-balance">
              A trusted Indian export house, built on quality and trust.
            </h2>
            <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Valoreina is a trusted Indian export and trading company dedicated to supplying premium agricultural products, food products, spices, garments and household goods to customers across the world.
              </p>
              <p>
                We are committed to quality, transparency, ethical sourcing, timely delivery and long-term partnerships with importers, distributors and retail chains.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { k: "Origin", v: "India" },
                { k: "Reach", v: "12+ Markets" },
                { k: "Since", v: "2018" },
              ].map((b) => (
                <div key={b.k}>
                  <div className="font-serif text-2xl text-emerald-brand">{b.v}</div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">{b.k}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-border">
              <img src={office} alt="Modern Valoreina corporate office meeting" loading="lazy" width={1600} height={1280} className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden md:block bg-emerald-brand text-white p-6 rounded-2xl max-w-[240px] shadow-xl">
              <div className="font-serif text-3xl text-gold">100%</div>
              <div className="text-xs mt-1 text-white/80">Ethically sourced &amp; quality checked at every step.</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-28 px-6 bg-beige">
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-gold">Our Products</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 text-balance">
              Four categories. One uncompromising standard.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              From the soil of Indian farms to refined household and apparel goods — every category is sourced, inspected, and packed for global retail and distribution.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {productCategories.map((cat, i) => (
              <motion.article
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-3xl bg-background ring-1 ring-border hover:shadow-2xl hover:shadow-emerald-brand/10 transition-all duration-500"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={cat.image} alt={cat.name} loading="lazy" width={1280} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] uppercase tracking-[0.16em] text-gold">{cat.tag}</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-emerald-brand">{cat.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {cat.items.map((it) => (
                      <span key={it} className="text-[11px] px-2.5 py-1 rounded-full bg-muted text-muted-foreground">{it}</span>
                    ))}
                  </div>
                  <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-brand hover:text-gold transition-colors">
                    Request Quote <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-28 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-gold">Why Choose Us</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 text-balance">Built for international buyers.</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyUs.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="group p-7 rounded-2xl bg-background ring-1 ring-border hover:ring-emerald-brand/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-brand/10 text-emerald-brand group-hover:bg-emerald-brand group-hover:text-white transition-colors">
                  <w.icon className="size-5" />
                </div>
                <h3 className="font-serif text-lg mt-5">{w.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY PROCESS */}
      <section id="process" className="py-28 px-6 bg-emerald-deep text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={quality} alt="" loading="lazy" width={1600} height={1280} className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep via-emerald-deep/80 to-emerald-deep" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-gold">Quality Process</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 text-balance">Seven steps. Zero compromises.</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute top-7 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent hidden lg:block" />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 relative">
              {qualitySteps.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="text-center"
                >
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold text-emerald-deep font-serif text-lg ring-4 ring-emerald-deep">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-4 text-sm font-medium">{step}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL PRESENCE */}
      <section id="global" className="py-28 px-6">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="text-xs uppercase tracking-[0.2em] text-gold">Global Presence</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 text-balance">A network without borders.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              From processing hubs in India, our shipments reach buyers across North America, Europe, the Middle East, Africa and Asia-Pacific.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {countries.map((c) => (
                <div key={c} className="flex items-center gap-2 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                  <span className="text-muted-foreground">{c}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative aspect-[4/3] rounded-3xl overflow-hidden ring-1 ring-border">
            <img src={cargoShip} alt="Cargo ship loaded with containers at sunset" loading="lazy" width={1920} height={1080} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
              <div>
                <div className="font-serif text-2xl">Global Logistics</div>
                <div className="text-xs uppercase tracking-[0.18em] opacity-80">Sea • Air • Multimodal</div>
              </div>
              <div className="text-right">
                <div className="font-serif text-3xl text-gold">12+</div>
                <div className="text-xs uppercase tracking-[0.18em] opacity-80">Markets</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-6 bg-beige">
        <div className="mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="font-serif text-5xl md:text-6xl text-emerald-brand">{s.value}</div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-3">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-gold">Testimonials</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4">What buyers say</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.blockquote key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 rounded-2xl bg-beige ring-1 ring-border hover:ring-gold/40 transition-colors">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="size-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="font-serif text-lg leading-snug text-foreground">"{t.quote}"</p>
                <footer className="mt-6 pt-5 border-t border-border">
                  <div className="text-sm font-medium">{t.author}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t.country}</div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 px-6 bg-beige relative overflow-hidden">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="text-xs uppercase tracking-[0.2em] text-gold">Contact Us</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 text-balance">Let's start a partnership.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Share your requirements and our export desk will respond with pricing, documentation and shipping timelines within 24 hours.
            </p>
            <div className="mt-10 space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="size-4 text-emerald-brand mt-0.5 shrink-0" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Email</div>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-emerald-brand">{CONTACT_EMAIL}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="size-4 text-emerald-brand mt-0.5 shrink-0" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Headquarters</div>
                  <div>{CONTACT_ADDRESS}</div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-background p-8 md:p-10 rounded-3xl ring-1 ring-border shadow-xl shadow-emerald-brand/5">
            <InquiryForm />
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-emerald-deep text-white pt-20 pb-8 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <img src={LOGO_URL} alt="Valoreina logo" width={48} height={48} className="h-12 w-12 rounded-full object-contain bg-white/5 ring-1 ring-white/10" />
                <span className="font-serif text-2xl">Valoreina</span>
              </div>
              <p className="mt-5 text-white/70 max-w-md text-sm leading-relaxed">
                A premium Indian export and trading company committed to quality, transparency and lasting global partnerships.
              </p>
              <div className="mt-6 space-y-2 text-sm text-white/70">
                <div className="flex items-start gap-2"><MapPin className="size-4 text-gold mt-0.5 shrink-0" /> {CONTACT_ADDRESS}</div>
                <div className="flex items-start gap-2"><Mail className="size-4 text-gold mt-0.5 shrink-0" /> <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-gold">{CONTACT_EMAIL}</a></div>
              </div>
              <div className="mt-6 flex gap-3">
                <a href="#" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-white/20 hover:bg-gold hover:text-emerald-deep transition-colors"><Linkedin className="size-4" /></a>
                <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-white/20 hover:bg-gold hover:text-emerald-deep transition-colors"><Instagram className="size-4" /></a>
                <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email" className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-white/20 hover:bg-gold hover:text-emerald-deep transition-colors"><Mail className="size-4" /></a>
              </div>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.18em] text-gold mb-4">Company</h4>
              <nav className="flex flex-col gap-2 text-sm text-white/70">
                <a href="#about" className="hover:text-gold">About</a>
                <a href="#products" className="hover:text-gold">Products</a>
                <a href="#process" className="hover:text-gold">Export Process</a>
                <a href="#contact" className="hover:text-gold">Contact</a>
              </nav>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.18em] text-gold mb-4">Compliance</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>GSTIN: <span className="text-white">On Request</span></li>
                <li>IEC: <span className="text-white">On Request</span></li>
                <li>FSSAI Certified</li>
                <li>APEDA Registered</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-[11px] uppercase tracking-[0.18em] text-white/50">
            <span>© {new Date().getFullYear()} Valoreina. All Rights Reserved.</span>
            <span>Regulated by Export Inspection Council of India</span>
          </div>
        </div>
      </footer>

      <BackToTop />
      <WhatsAppButton />
    </div>
  );
}
