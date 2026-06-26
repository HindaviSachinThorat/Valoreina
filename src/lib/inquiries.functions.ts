import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InquirySchema = z.object({
  full_name: z.string().trim().min(1).max(200),
  company_email: z.string().trim().email().max(200),
  commodity: z.string().trim().min(1).max(100),
  message: z.string().trim().min(1).max(5000),
});

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InquirySchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );
    const { error } = await supabaseAdmin.from("inquiries").insert(data);
    if (error) {
      console.error("inquiry insert failed", error);
      throw new Error("Could not submit inquiry. Please try again.");
    }
    return { ok: true as const };
  });
