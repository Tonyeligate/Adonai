import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Phone, MapPin, Mail, Send, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Adonai International School, Tema West" },
      { name: "description", content: "Get in touch with Adonai International School in Adjei Kojo, Tema West. Phone, email, map and contact form." },
      { property: "og:title", content: "Contact — Adonai International School" },
      { property: "og:description", content: "Phone, email, map and contact form for Adonai International School." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const faqs = [
  { q: "How do I apply for admission?", a: "Visit the Admissions page to submit an online application, or call us directly. Our team will guide you through assessment, interview and enrollment." },
  { q: "What curriculum do you offer?", a: "We deliver the Ghana Education Service curriculum enriched with ICT, STEM and character formation from Creche to JHS." },
  { q: "Are extracurricular activities available?", a: "Yes — sports, cultural arts, ICT, reading and leadership clubs run throughout the year." },
  { q: "What are the admission requirements?", a: "Birth certificate, passport photos, previous school report (if applicable), transfer letter (if transferring) and a completed application form." },
];

function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const d = Object.fromEntries(fd) as Record<string, string>;
    const body = `Name: ${d.name}%0AEmail: ${d.email}%0APhone: ${d.phone}%0A%0A${d.message}`;
    window.location.href = `mailto:info@adonaischool.edu.gh?subject=Website Enquiry — ${encodeURIComponent(d.name || "")}&body=${body}`;
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <SiteLayout>
      <PageHero eyebrow="Contact" title="We'd love to hear from you." subtitle="Call, visit or send us a message — we typically respond within 24 hours." />

      <section className="section-pad">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {[
              { i: Phone, t: "Call us", d: ["+233 24 021 8814", "+233 54 657 1438"], href: "tel:+233240218814" },
              { i: MapPin, t: "Visit us", d: ["Adjei Kojo, Tema West", "Greater Accra, Ghana"] },
              { i: Mail, t: "Email us", d: ["info@adonaischool.edu.gh"], href: "mailto:info@adonaischool.edu.gh" },
            ].map(({ i: Icon, t, d, href }) => (
              <a key={t} href={href ?? "#"} className="flex gap-4 rounded-2xl border border-border bg-card p-6 transition hover:border-primary hover:shadow-[var(--shadow-soft)]">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"><Icon className="h-5 w-5" /></div>
                <div>
                  <div className="font-display text-lg font-semibold">{t}</div>
                  {d.map((x) => <div key={x} className="text-sm text-muted-foreground">{x}</div>)}
                </div>
              </a>
            ))}
            <div className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-soft)]">
              <iframe
                title="Adonai International School location"
                src="https://www.google.com/maps?q=Adjei+Kojo,+Tema+West,+Ghana&output=embed"
                width="100%"
                height="320"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block"
              />
            </div>
          </div>

          <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] md:p-10">
            <h2 className="font-display text-2xl font-bold">Send us a message</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" required />
              <Field label="Phone" name="phone" type="tel" />
              <div className="sm:col-span-2"><Field label="Email" name="email" type="email" required /></div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">Message<span className="text-destructive"> *</span>
                  <textarea name="message" rows={5} required className="mt-1.5 block w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </label>
              </div>
            </div>
            <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-glow">
              <Send className="h-4 w-4" /> Send message
            </button>
            {sent && <p className="mt-3 text-sm text-primary">Thanks — your email draft is ready to send.</p>}
          </form>
        </div>
      </section>

      <section className="section-pad bg-secondary/60">
        <div className="container-x">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Frequently asked questions</h2>
          <div className="mt-8 grid gap-3 lg:grid-cols-2">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-border bg-card p-6 transition open:shadow-[var(--shadow-soft)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold">
                  {f.q}
                  <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="text-sm font-medium">{label}{required && <span className="text-destructive"> *</span>}
      <input name={name} type={type} required={required}
        className="mt-1.5 block w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </label>
  );
}
