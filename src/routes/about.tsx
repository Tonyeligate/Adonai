import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import campus from "@/assets/campus.jpg";
import campusTwo from "@/assets/campus-2.jpg";
import campusThree from "@/assets/campus-3.jpg";
import graduation from "@/assets/graduation.jpg";
import proprietorImg from "@/images/proprietor.jpg";
import headmasterImg from "@/images/headmaster.jpg";
import academicCoordinatorImg from "@/images/academic-coordinator.jpg";
import secretaryImg from "@/images/secretary.jpg";
import { Award, Compass, Heart, Lightbulb, Scale, Crown } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Adonai International School, Tema West" },
      { name: "description", content: "Discover our story, vision, mission and the leadership shaping Adonai International School in Adjei Kojo, Tema West, Ghana." },
      { property: "og:title", content: "About Adonai International School" },
      { property: "og:description", content: "Founded on discipline and hard work — a story of growth, impact and excellence in Ghanaian education." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const values = [
  { i: Scale, t: "Discipline", d: "We hold high standards of conduct, punctuality and personal responsibility." },
  { i: Award, t: "Excellence", d: "We pursue our best in academics, character and every endeavour." },
  { i: Heart, t: "Integrity", d: "We act honestly, faithfully and with moral courage." },
  { i: Lightbulb, t: "Innovation", d: "We embrace ICT, STEM and creative thinking to prepare global learners." },
  { i: Compass, t: "Respect", d: "We honour every person, culture and faith within our community." },
  { i: Crown, t: "Leadership", d: "We raise servant-leaders who lead by example and serve their community." },
];

const team = [
  {
    n: "The Proprietor",
    r: "Founder & Proprietor",
    b: "A visionary educator whose passion for child development gave birth to Adonai — a school built on faith, discipline and academic excellence.",
    img: proprietorImg,
    alt: "The Proprietor of Adonai International School",
  },
  {
    n: "The Headmaster",
    r: "Head of School",
    b: "A seasoned school leader guiding daily operations, academic standards and staff development across every level.",
    img: headmasterImg,
    alt: "The Headmaster of Adonai International School",
  },
  {
    n: "Academic Coordinator",
    r: "Curriculum & Assessment",
    b: "Oversees the Ghana Education Service curriculum, lesson planning, assessment and teacher mentorship.",
    img: academicCoordinatorImg,
    alt: "Academic Coordinator of Adonai International School",
  },
  {
    n: "Secretary",
    r: "Administration & Records",
    b: "Supports school communication, documentation and the daily coordination that keeps the campus running smoothly.",
    img: secretaryImg,
    alt: "Secretary of Adonai International School",
  },
];

function About() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About Us"
        title="A school built on faith, discipline and excellence."
        subtitle="From a small dream to a thriving community of learners in Tema West — this is the story of Adonai International School."
      />

      <section className="section-pad">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <img src={campus} alt="Adonai International School campus" className="rounded-3xl shadow-[var(--shadow-elegant)]" loading="lazy" width={1600} height={1067} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Our Story</p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">More than a decade of educating Ghana's future</h2>
            <div className="mt-5 space-y-4 text-muted-foreground">
              <p>Adonai International School was founded with a simple yet bold vision: to raise a generation of disciplined, hardworking and globally competitive learners right here in Adjei Kojo, Tema West.</p>
              <p>What began as a small early years setting has grown — through the dedication of parents, teachers and pupils — into a full Creche-to-JHS institution recognised for academic excellence, moral training and an unmistakable family culture.</p>
              <p>Today, hundreds of alumni carry the Adonai spirit into senior high schools, universities and careers across Ghana and beyond.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-secondary/60">
        <div className="container-x grid gap-8 md:grid-cols-2">
          {[
            { t: "Our Vision", d: "To become a leading educational institution producing globally competitive and morally upright leaders." },
            { t: "Our Mission", d: "To provide quality education that develops intellectual excellence, discipline, leadership, and lifelong learning." },
          ].map((b) => (
            <div key={b.t} className="rounded-3xl border border-border bg-card p-10 shadow-[var(--shadow-soft)]">
              <h3 className="font-display text-2xl font-bold text-primary">{b.t}</h3>
              <p className="mt-4 text-lg leading-relaxed text-foreground/85">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Core Values</p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">What we live by</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ i: Icon, t, d }) => (
              <div key={t} className="rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary">
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
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Leadership</p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">Meet the team behind Adonai</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {team.map((p) => (
              <div key={p.n} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <img src={p.img} alt={p.alt} className="h-56 w-full object-cover" loading="lazy" width={1200} height={900} />
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold">{p.n}</h3>
                  <p className="text-sm font-medium text-gold">{p.r}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{p.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
