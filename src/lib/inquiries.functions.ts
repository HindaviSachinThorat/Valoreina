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
  .validator((data: unknown) => InquirySchema.parse(data))
  .handler(async ({ data }) => {
    console.log('[submitInquiry] received payload:', data);
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
    try {
      const { error } = await supabaseAdmin.from("inquiries").insert(payload);
      if (error) {
        console.error("inquiry insert failed", error);
        throw new Error("Could not submit inquiry. Please try again.");
      }
    } catch (e) {
      console.error('[submitInquiry] supabase insert error:', e);
      // continue to store locally and attempt to send email even if supabase fails
    }

    // Attempt to send notification email if SMTP is configured
    try {
      const SMTP_HOST = process.env.SMTP_HOST;
      const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
      const SMTP_USER = process.env.SMTP_USER;
      const SMTP_PASS = process.env.SMTP_PASS;
      const EMAIL_FROM = process.env.EMAIL_FROM || SMTP_USER;
      const EMAIL_TO = process.env.EMAIL_TO || 'info.valoreina@gmail.com';
      console.log('[submitInquiry] smtp config', {
        SMTP_HOST: Boolean(SMTP_HOST),
        SMTP_PORT: SMTP_PORT || null,
        SMTP_USER: Boolean(SMTP_USER),
        SMTP_PASS: Boolean(SMTP_PASS),
        EMAIL_FROM: Boolean(EMAIL_FROM),
        EMAIL_TO,
      });
      if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: SMTP_PORT,
          secure: SMTP_PORT === 465,
          auth: { user: SMTP_USER, pass: SMTP_PASS },
        });
        const html = `
          <h3>New inquiry received</h3>
          <ul>
            <li><strong>Name:</strong> ${payload.full_name}</li>
            <li><strong>Email:</strong> ${payload.company_email}</li>
            <li><strong>Company:</strong> ${payload.company}</li>
            <li><strong>Country:</strong> ${payload.country}</li>
            <li><strong>Phone:</strong> ${payload.phone}</li>
            <li><strong>Commodity:</strong> ${payload.commodity}</li>
            <li><strong>Quantity:</strong> ${payload.quantity}</li>
            <li><strong>Message:</strong> ${payload.message}</li>
          </ul>
        `;
        await transporter.sendMail({
          from: EMAIL_FROM || SMTP_USER,
          to: EMAIL_TO,
          subject: `New inquiry from ${payload.full_name}`,
          html,
        });
        console.log('[submitInquiry] notification email sent to', EMAIL_TO);
      } else {
        console.log('[submitInquiry] SMTP not configured; skipping email send');
      }
    } catch (e) {
      console.error('[submitInquiry] failed to send notification email', e);
    }

    // Attempt to send WhatsApp notification via WhatsApp Cloud API (server-side)
    try {
      const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID;
      const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
      const WHATSAPP_TO = process.env.WHATSAPP_TO; // recipient number in international format without +
      if (WHATSAPP_PHONE_ID && WHATSAPP_TOKEN && WHATSAPP_TO) {
        const text = [
          `New inquiry from ${payload.full_name}`,
          payload.company ? `Company: ${payload.company}` : null,
          `Email: ${payload.company_email}`,
          payload.phone ? `Phone: ${payload.phone}` : null,
          `Country: ${payload.country}`,
          `Commodity: ${payload.commodity}`,
          payload.quantity ? `Quantity: ${payload.quantity}` : null,
          `Message: ${payload.message}`,
        ].filter(Boolean).join('\n');

        const url = `https://graph.facebook.com/v17.0/${WHATSAPP_PHONE_ID}/messages`;
        const body = {
          messaging_product: 'whatsapp',
          to: WHATSAPP_TO,
          type: 'text',
          text: { body: text },
        };

        const res = await fetch(url, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const txt = await res.text().catch(() => '');
          console.error('[submitInquiry] WhatsApp API error', res.status, txt);
        } else {
          console.log('[submitInquiry] WhatsApp notification sent');
        }
      } else {
        console.log('[submitInquiry] WhatsApp not configured; skipping WhatsApp send');
      }
    } catch (e) {
      console.error('[submitInquiry] failed to send WhatsApp notification', e);
    }
    return { ok: true as const };
  });
