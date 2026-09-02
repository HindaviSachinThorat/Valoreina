import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { submitInquiry } from "@/lib/inquiries.functions";

const categories = [
  "Agricultural Products",
  "Food Products & Spices",
  "Garments & Apparel",
  "Household Products",
  "Other / Custom",
];

export function InquiryForm() {
  const submit = useServerFn(submitInquiry);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      full_name: String(fd.get("full_name") ?? ""),
      company_email: String(fd.get("company_email") ?? ""),
      commodity: String(fd.get("commodity") ?? ""),
      message: String(fd.get("message") ?? ""),
      company: String(fd.get("company") ?? ""),
      country: String(fd.get("country") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      quantity: String(fd.get("quantity") ?? ""),
    };
    setLoading(true);
    try {
      await submit({ data: payload });
      toast.success("Inquiry received. Our export desk will reach out within 24 hours.");
      // Notification is sent server-side (email / WhatsApp) — do not redirect the user.
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("Could not submit. Please verify the form and try again.");
    } finally {
      setLoading(false);
    }
  }

  const fieldCls =
    "w-full bg-white/60 backdrop-blur-sm border border-border rounded-md px-4 py-3 text-sm focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/10 outline-none transition-all placeholder:text-muted-foreground/70";
  const labelCls = "text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground mb-1.5 block";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Full Name *</label>
          <input name="full_name" required maxLength={200} type="text" placeholder="Jane Doe" className={fieldCls} />
        </div>
        <div>
          <label className={labelCls}>Company</label>
          <input name="company" maxLength={200} type="text" placeholder="Acme Trading LLC" className={fieldCls} />
        </div>
        <div>
          <label className={labelCls}>Country</label>
          <input name="country" maxLength={100} type="text" placeholder="United Arab Emirates" className={fieldCls} />
        </div>
        <div>
          <label className={labelCls}>Email *</label>
          <input name="company_email" required maxLength={200} type="email" placeholder="procurement@firm.com" className={fieldCls} />
        </div>
        <div>
          <label className={labelCls}>Phone / WhatsApp</label>
          <input name="phone" maxLength={50} type="tel" placeholder="+971 50 000 0000" className={fieldCls} />
        </div>
        <div>
          <label className={labelCls}>Quantity Required</label>
          <input name="quantity" maxLength={100} type="text" placeholder="e.g. 20 MT / 1×40' FCL" className={fieldCls} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Product Required *</label>
        <select name="commodity" required defaultValue={categories[0]} className={fieldCls}>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className={labelCls}>Message *</label>
        <textarea
          name="message"
          required
          maxLength={5000}
          rows={4}
          placeholder="Specify product details, destination port, packaging requirements..."
          className={`${fieldCls} resize-none`}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="group relative w-full overflow-hidden bg-emerald-brand text-white py-4 text-sm font-medium tracking-wide rounded-md hover:bg-emerald-deep transition-colors disabled:opacity-60"
      >
        <span className="relative z-10">{loading ? "Sending Inquiry..." : "Send Inquiry →"}</span>
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </button>
    </form>
  );
}
