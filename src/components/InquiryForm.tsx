import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { submitInquiry } from "@/lib/inquiries.functions";

const commodities = [
  "Organic Jaggery",
  "Premium Turmeric",
  "Seasonal Vegetables",
  "Mixed / Other",
];

export function InquiryForm() {
  const submit = useServerFn(submitInquiry);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      full_name: String(fd.get("full_name") ?? ""),
      company_email: String(fd.get("company_email") ?? ""),
      commodity: String(fd.get("commodity") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    setLoading(true);
    try {
      await submit({ data: payload });
      toast.success("Inquiry received. Our export desk will reach out within 24 hours.");
      e.currentTarget.reset();
    } catch (err) {
      console.error(err);
      toast.error("Could not submit. Please verify the form and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Full Name
          </label>
          <input
            name="full_name"
            required
            maxLength={200}
            type="text"
            placeholder="John Doe"
            className="w-full bg-transparent border-b border-border py-2 focus:border-forest outline-none text-sm transition-colors"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Company Email
          </label>
          <input
            name="company_email"
            required
            maxLength={200}
            type="email"
            placeholder="procurement@firm.com"
            className="w-full bg-transparent border-b border-border py-2 focus:border-forest outline-none text-sm transition-colors"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Commodity of Interest
        </label>
        <select
          name="commodity"
          required
          defaultValue={commodities[0]}
          className="w-full bg-transparent border-b border-border py-2 focus:border-forest outline-none text-sm transition-colors"
        >
          {commodities.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Volume &amp; Destination
        </label>
        <textarea
          name="message"
          required
          maxLength={5000}
          rows={4}
          placeholder="Describe your required tonnage and port of discharge..."
          className="w-full bg-transparent border-b border-border py-2 focus:border-forest outline-none text-sm transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-forest text-cream py-3 text-sm font-medium rounded-[4px] ring-1 ring-forest hover:bg-forest/90 transition-colors disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit Request for Quotation"}
      </button>
    </form>
  );
}
