import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InquirySchema = z.object({
  full_name: z.string().trim().min(1).max(200),
  company_email: z.string().trim().email().max(200),
  commodity: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(5000),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  country: z.string().trim().max(100).optional().or(z.literal("")),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  quantity: z.string().trim().max(100).optional().or(z.literal("")),
});

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InquirySchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );
    const payload = {
      full_name: data.full_name,
      company_email: data.company_email,
      commodity: data.commodity,
      message: data.message,
      company: data.company || null,
      country: data.country || null,
      phone: data.phone || null,
      quantity: data.quantity || null,
    };
    const { error } = await supabaseAdmin.from("inquiries").insert(payload);
    if (error) {
      console.error("inquiry insert failed", error);
      throw new Error("Could not submit inquiry. Please try again.");
    }
    return { ok: true as const };
  });
