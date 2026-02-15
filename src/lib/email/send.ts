import { Resend } from "resend";
import { QuoteReceivedCustomerEmail } from "@/lib/email/templates/quote-received-customer";
import { QuoteReceivedAdminEmail } from "@/lib/email/templates/quote-received-admin";

export type InquiryEmailData = {
  type: "kagu" | "airport";
  name: string;
  email: string;
  phone: string;
  pickup: string;
  dropoff: string;
  datetimeCandidates: string[];
  summary: string;
  adminUrl: string;
};

function requireEmailEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export async function sendInquiryEmails(data: InquiryEmailData) {
  const resendApiKey = requireEmailEnv("RESEND_API_KEY");
  const from = requireEmailEnv("FROM_EMAIL");
  const adminEmail = requireEmailEnv("ADMIN_EMAIL");
  const resend = new Resend(resendApiKey);

  const subjectUser =
    data.type === "kagu"
      ? "【受付完了】家具大型荷物運搬のお見積もり"
      : "【受付完了】空港送迎のお見積もり";

  const subjectAdmin =
    data.type === "kagu"
      ? "【新規問い合わせ】家具大型荷物運搬"
      : "【新規問い合わせ】空港送迎";

  await resend.emails.send({
    from,
    to: data.email,
    subject: subjectUser,
    react: QuoteReceivedCustomerEmail({
      type: data.type,
      name: data.name,
      pickup: data.pickup,
      dropoff: data.dropoff,
      datetimeCandidates: data.datetimeCandidates,
    }),
  });

  await resend.emails.send({
    from,
    to: adminEmail,
    subject: subjectAdmin,
    react: QuoteReceivedAdminEmail({
      type: data.type,
      name: data.name,
      phone: data.phone,
      email: data.email,
      pickup: data.pickup,
      dropoff: data.dropoff,
      datetimeCandidates: data.datetimeCandidates,
      summary: data.summary,
      adminUrl: data.adminUrl,
    }),
  });
}
