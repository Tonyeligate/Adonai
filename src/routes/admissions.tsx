import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Check, FileText, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions | Apply to Adonai International School, Tema West" },
      { name: "description", content: "Admission process, requirements and online application form for Adonai International School in Adjei Kojo, Tema West, Ghana." },
      { property: "og:title", content: "Admissions — Adonai International School" },
      { property: "og:description", content: "Apply online, view requirements and book a campus visit." },
      { property: "og:url", content: "/admissions" },
    ],
    links: [{ rel: "canonical", href: "/admissions" }],
  }),
  component: Admissions,
});

const steps = [
  { t: "Inquiry", d: "Call, WhatsApp or fill the form below to start the conversation." },
  { t: "Application Form", d: "Complete the online or printed application form with required documents." },
  { t: "Assessment", d: "Age-appropriate assessment to understand your child's needs." },
  { t: "Interview", d: "Short interview with parents and the prospective pupil." },
  { t: "Admission Offer", d: "Successful applicants receive an official admission letter." },
  { t: "Enrollment", d: "Pay fees, collect uniforms and welcome to the Adonai family." },
];

const requirements = [
  "Birth Certificate",
  "Two passport-sized photographs",
  "Previous school report (where applicable)",
  "Transfer / release letter (transferring pupils)",
  "Completed online application form",
];

function Admissions() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd) as Record<string, string>;
    const childName = [data.childSurname, data.childFirstName, data.childOtherName].filter(Boolean).join(" ").trim();
    const applicationNotes = [
      `Date of Birth: ${data.dateOfBirth || "-"}`,
      `Religion: ${data.religion || "-"}`,
      `Tribe: ${data.tribe || "-"}`,
      `Previous School: ${data.previousSchool || "-"}`,
      `Mother's Name: ${data.motherName || "-"}`,
      `Mother's Language: ${data.motherLanguage || "-"}`,
      `Mother's Occupation: ${data.motherOccupation || "-"}`,
      `Mother's Phone: ${data.motherPhone || "-"}`,
      `Father's Name: ${data.fatherName || "-"}`,
      `Father's Language: ${data.fatherLanguage || "-"}`,
      `Father's Occupation: ${data.fatherOccupation || "-"}`,
      `Father's Phone: ${data.fatherPhone || "-"}`,
      `Location: ${data.location || "-"}`,
      `House Number: ${data.houseNumber || "-"}`,
      `Other Useful Information: ${data.notes || "-"}`,
    ].join("\n");
    setSubmitting(true);
    try {
      const { error } = await supabase.from("applications").insert({
        parent_name: data.parent,
        child_name: childName,
        class_applying_for: data.class,
        phone: data.phone,
        email: data.email,
        notes: applicationNotes,
      });
      if (error) throw error;
      toast.success("Application received! We'll contact you within 24 hours.");
      const body = [
        "Hello Adonai International School,",
        "",
        "I'd like to apply for admission.",
        "",
        `Parent / Guardian: ${data.parent || "-"}`,
        `Child: ${childName || "-"}`,
        `Class: ${data.class || "-"}`,
        `Phone: ${data.phone || "-"}`,
        `Email: ${data.email || "-"}`,
        "",
        applicationNotes,
      ].join("\n");
      window.location.href = `mailto:info@adonaischool.edu.gh?subject=Admission Inquiry — ${encodeURIComponent(childName || "")}&body=${encodeURIComponent(body)}`;
      setSent(true);
      form.reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <SiteLayout>
      <PageHero
        eyebrow="Admissions"
        title="Begin your child's Adonai journey."
        subtitle="A simple, transparent six-step admission process designed with families in mind."
      />

      {/* Timeline */}
      <section className="section-pad">
        <div className="container-x">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Admission process</h2>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.t} className="relative rounded-2xl border border-border bg-card p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
                <div className="absolute -top-4 left-7 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold font-display text-sm font-bold text-gold-foreground shadow">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Requirements + Form */}
      <section className="section-pad bg-secondary/60">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Requirements</p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">What you'll need</h2>
            <ul className="mt-6 space-y-3">
              {requirements.map((r) => (
                <li key={r} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="h-4 w-4" /></div>
                  <span className="text-sm text-foreground">{r}</span>
                </li>
              ))}
            </ul>
            <a href="#" className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary">
              <FileText className="h-4 w-4" /> Download Admission Form (PDF)
            </a>
          </div>

          <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] md:p-10">
            <h3 className="font-display text-2xl font-bold">Online application</h3>
            <p className="mt-1 text-sm text-muted-foreground">Please complete the form in block letters. We'll get back within 24 hours.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Parent / Guardian" name="parent" required />
              <Field label="Child surname" name="childSurname" required />
              <Field label="Child first name" name="childFirstName" required />
              <Field label="Child other name" name="childOtherName" />
              <Field label="Date of birth" name="dateOfBirth" type="date" required />
              <Field label="Religion" name="religion" required />
              <Field label="Tribe" name="tribe" required />
              <Field label="Class applying for" name="class" placeholder="e.g. KG 2 / Primary 4 / JHS 1" required />
              <Field label="Phone number" name="phone" type="tel" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Mother's name" name="motherName" required />
              <Field label="Mother's language" name="motherLanguage" required />
              <Field label="Mother's occupation" name="motherOccupation" required />
              <Field label="Mother's phone number" name="motherPhone" type="tel" required />
              <Field label="Father's name" name="fatherName" required />
              <Field label="Father's language" name="fatherLanguage" required />
              <Field label="Father's occupation" name="fatherOccupation" required />
              <Field label="Father's phone number" name="fatherPhone" type="tel" required />
              <Field label="Location" name="location" required />
              <Field label="House number" name="houseNumber" required />
              <Field label="Previous school" name="previousSchool" />
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">Any other useful information (illness, allergies, habits etc.)
                  <textarea name="notes" rows={4} className="mt-1.5 block w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </label>
              </div>
            </div>
            <button type="submit" disabled={submitting} className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-glow disabled:opacity-60">
              <Send className="h-4 w-4" /> {submitting ? "Submitting…" : "Submit application"}
            </button>
            {sent && <p className="mt-3 text-sm text-primary">Thank you — your application has been received. Our admissions team will contact you within 24 hours.</p>}
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <label className="text-sm font-medium">{label}{required && <span className="text-destructive"> *</span>}
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 block w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}
