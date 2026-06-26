import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { ArrowRight } from "lucide-react";

import heroCrate from "@/assets/hero-crate.jpg";
import productJaggery from "@/assets/product-jaggery.jpg";
import productTurmeric from "@/assets/product-turmeric.jpg";
import productVegetables from "@/assets/product-vegetables.jpg";
import globalMap from "@/assets/global-map.jpg";
import { InquiryForm } from "@/components/InquiryForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Valoreina — Premium Indian Agricultural Exports" },
      {
        name: "description",
        content:
          "Valoreina exports premium jaggery, turmeric, and seasonal vegetables from India to global markets. Heritage sourcing, certified quality, traceable supply chain.",
      },
      { property: "og:title", content: "Valoreina — Premium Indian Agricultural Exports" },
      {
        property: "og:description",
        content:
          "Curated jaggery, turmeric, and vegetables from India's finest farms to discerning global markets.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const products = [
  {
    title: "Prime Cane Jaggery",
    label: "Organic Jaggery",
    image: productJaggery,
    rows: [
      ["Origin", "Maharashtra"],
      ["Purity", "100% Chemical Free"],
      ["Form", "Blocks / Powder"],
    ],
  },
  {
    title: "High Curcumin Turmeric",
    label: "Alleppey Turmeric",
    image: productTurmeric,
    rows: [
      ["Origin", "Sangli / Salem"],
      ["Curcumin", "5.5% – 7%"],
      ["Grade", "Export Quality"],
    ],
  },
  {
    title: "Assorted Vegetables",
    label: "Seasonal Fresh",
    image: productVegetables,
    rows: [
      ["Temp", "Cold Chain Regulated"],
      ["Variety", "Okra / Chili / Gourd"],
      ["Transit", "Air / Sea Freight"],
    ],
  },
];

const certifications = ["FSSAI Certified", "APEDA Member", "ISO 22000", "Organic India"];

function Home() {
  return (
    <div className="bg-cream font-sans text-ink">
      <Toaster position="top-center" richColors />

      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-cream/80 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
          <a href="#top" className="font-serif text-xl tracking-tight text-forest">
            Valoreina
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#products" className="hover:text-forest transition-colors">Products</a>
            <a href="#about" className="hover:text-forest transition-colors">About</a>
            <a href="#quality" className="hover:text-forest transition-colors">Quality</a>
            <a href="#contact" className="hover:text-forest transition-colors">Contact</a>
          </div>
          <a
            href="#contact"
            className="text-sm font-medium px-4 py-1.5 ring-1 ring-border rounded-full hover:bg-forest hover:text-cream hover:ring-forest transition-colors"
          >
            Inquiry
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section id="top" className="pt-32 pb-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-end">
            <div className="space-y-8">
              <h1 className="font-serif text-5xl md:text-7xl leading-none text-forest text-balance max-w-[20ch]">
                Exporting the soul of Indian soil to the global table.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty max-w-[56ch]">
                Valoreina bridges the gap between traditional Indian agricultural mastery and
                international quality standards. We curate premium jaggery, turmeric, and seasonal
                vegetables for discerning global markets.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="#contact"
                  className="bg-forest text-cream py-2 pr-4 pl-3 inline-flex items-center gap-2 text-sm font-medium rounded-[4px] ring-1 ring-forest hover:bg-forest/90 transition-colors"
                >
                  <ArrowRight className="size-4 shrink-0" />
                  Request a Quote
                </a>
              </div>
            </div>
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[min(1vw,12px)] outline outline-1 -outline-offset-1 outline-black/5">
              <img
                src={heroCrate}
                alt="Heritage wooden export crate with wax seal resting on raw turmeric roots"
                width={896}
                height={1120}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="quality" className="py-12 border-y border-border bg-muted">
        <div className="mx-auto max-w-7xl px-6 flex flex-wrap justify-between items-center gap-8 opacity-70">
          {certifications.map((c) => (
            <span key={c} className="font-serif text-lg text-forest">
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 space-y-4">
            <span className="text-xs font-medium uppercase tracking-widest text-clay">
              Our Provisions
            </span>
            <h2 className="font-serif text-4xl text-forest text-balance max-w-[30ch]">
              Grown with patience, harvested with precision.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((p) => (
              <article key={p.title} className="group space-y-6">
                <div className="w-full aspect-[3/4] overflow-hidden rounded-[min(1vw,12px)] outline outline-1 -outline-offset-1 outline-black/5">
                  <img
                    src={p.image}
                    alt={p.label}
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl text-forest">{p.title}</h3>
                  <dl className="divide-y divide-border text-sm">
                    {p.rows.map(([k, v]) => (
                      <div key={k} className="py-2 flex justify-between">
                        <dt>{k}</dt>
                        <dd className="text-muted-foreground">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section id="about" className="py-24 bg-forest text-cream">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="font-serif text-4xl leading-tight text-balance max-w-[30ch]">
              A supply chain without boundaries.
            </h2>
            <p className="text-cream/70 text-pretty max-w-[48ch]">
              From our processing hubs in India, we manage a seamless logistics network reaching
              markets in Europe, the Middle East, and Southeast Asia. Every shipment is tracked,
              certified, and delivered with integrity.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-3xl font-serif text-gold">14+</div>
                <div className="text-xs uppercase tracking-widest text-cream/50 mt-1">
                  Countries Served
                </div>
              </div>
              <div>
                <div className="text-3xl font-serif text-gold">100%</div>
                <div className="text-xs uppercase tracking-widest text-cream/50 mt-1">
                  Traceability
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full aspect-video overflow-hidden rounded-[min(1vw,12px)] outline outline-1 -outline-offset-1 outline-white/10">
            <img
              src={globalMap}
              alt="Global logistics network radiating from India"
              loading="lazy"
              width={1280}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Inquiry */}
      <section id="contact" className="py-24 px-6 bg-cream">
        <div className="mx-auto max-w-2xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-serif text-4xl text-forest">Initiate Trade</h2>
            <p className="text-muted-foreground">
              Specify your requirements and our export desk will contact you within 24 hours.
            </p>
          </div>
          <InquiryForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-4">
            <span className="font-serif text-2xl text-forest">Valoreina</span>
            <p className="text-sm text-muted-foreground max-w-[30ch]">
              Finest agricultural exports from the heart of India to the world.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-16">
            <div className="space-y-4">
              <h4 className="text-xs font-medium uppercase tracking-widest text-foreground">
                Operations
              </h4>
              <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                <a href="#quality" className="hover:text-forest">Quality Control</a>
                <a href="#products" className="hover:text-forest">Sourcing</a>
                <a href="#about" className="hover:text-forest">Logistics</a>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-medium uppercase tracking-widest text-foreground">
                Reach
              </h4>
              <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                <a href="#contact" className="hover:text-forest">Contact</a>
                <a href="mailto:trade@valoreina.com" className="hover:text-forest">trade@valoreina.com</a>
              </nav>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} Valoreina Trading House</span>
          <span>Regulated by Export Inspection Council</span>
        </div>
      </footer>
    </div>
  );
}
