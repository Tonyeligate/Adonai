import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { BookOpen, Cpu, FlaskConical, Calculator, Languages, Trophy } from "lucide-react";
import creche from "@/assets/creche.jpg";
import kindergarten from "@/assets/kindergarten.jpg";
import ict from "@/assets/ict-lab.svg";
import jhs from "@/assets/jhs.jpg";

export const Route = createFileRoute("/academics")({
  head: () => ({
    meta: [
      { title: "Academics | Curriculum & Departments — Adonai International School" },
      { name: "description", content: "Explore the Adonai curriculum: Ghana Education Service syllabus, ICT integration, STEM, literacy and numeracy programmes from Creche to JHS." },
      { property: "og:title", content: "Academics — Adonai International School" },
      { property: "og:description", content: "Curriculum, departments, and academic excellence at Adonai International School." },
      { property: "og:url", content: "/academics" },
    ],
    links: [{ rel: "canonical", href: "/academics" }],
  }),
  component: Academics,
});

const overview = [
  { i: BookOpen, t: "GES Curriculum", d: "Faithful delivery of the Ghana Education Service curriculum, enriched with international best practice." },
  { i: Cpu, t: "ICT Integration", d: "Coding, digital literacy and research skills across every grade level." },
  { i: FlaskConical, t: "STEM Education", d: "Hands-on science, technology, engineering and maths to build critical thinkers." },
  { i: Languages, t: "Literacy Programme", d: "Phonics, guided reading and writing workshops for confident communicators." },
  { i: Calculator, t: "Numeracy Programme", d: "Conceptual maths with daily practice, problem-solving and reasoning." },
  { i: Trophy, t: "Academic Excellence", d: "Consistent BECE results, competitions and merit-based recognition." },
];

const departments = [
  { t: "Creche & Nursery", o: "Safe, loving care with playful early-learning experiences.", a: "Play-based, sensory and social learning.", s: ["Language play", "Numbers & shapes", "Music & movement", "Creative arts"], img: creche },
  { t: "Kindergarten", o: "Phonics, early numeracy, social skills and moral foundations.", a: "Theme-based learning with hands-on activities.", s: ["English language", "Numeracy", "Our World Our People", "Creative arts"], img: kindergarten },
  { t: "Primary School", o: "Strong literacy, numeracy and ICT foundations.", a: "Inquiry-led classrooms with regular assessment.", s: ["English", "Mathematics", "Science", "ICT", "Religious & Moral Ed.", "Ghanaian Language", "French"], img: ict },
  { t: "Junior High School", o: "BECE preparation, STEM focus and leadership development.", a: "Subject specialists with structured revision and mentorship.", s: ["English", "Mathematics", "Integrated Science", "Social Studies", "ICT", "Career Tech", "RME", "French", "Ghanaian Language"], img: jhs },
];

function Academics() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Academics"
        title="A rigorous, modern curriculum from Creche to JHS."
        subtitle="Built on the Ghana Education Service framework and enriched with ICT, STEM and character formation."
      />

      <section className="section-pad">
        <div className="container-x">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {overview.map(({ i: Icon, t, d }) => (
              <div key={t} className="rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-secondary/60">
        <div className="container-x space-y-12">
          {departments.map((d, i) => (
            <article key={d.t} className={`grid gap-8 lg:grid-cols-2 lg:items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <img src={d.img} alt={`${d.t} at Adonai`} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-[var(--shadow-soft)]" loading="lazy" width={1200} height={800} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Department</p>
                <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">{d.t}</h2>
                <p className="mt-4 text-muted-foreground">{d.o}</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">Teaching approach</h3>
                    <p className="mt-2 text-sm text-foreground/85">{d.a}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">Key subjects</h3>
                    <ul className="mt-2 flex flex-wrap gap-2 text-xs">
                      {d.s.map((sub) => <li key={sub} className="rounded-full border border-border bg-background px-3 py-1.5">{sub}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x">
          <div className="rounded-3xl border border-border bg-card p-10 shadow-[var(--shadow-soft)] md:p-14">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Excellence</p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Awards, competitions and student achievements</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { n: "95%", l: "BECE pass rate" },
                { n: "30+", l: "Inter-school awards" },
                { n: "12", l: "Sporting trophies" },
                { n: "100%", l: "Transition to SHS" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-secondary p-6 text-center">
                  <div className="font-display text-4xl font-extrabold text-primary">{s.n}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
