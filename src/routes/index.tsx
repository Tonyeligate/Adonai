import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Laptop,
  HeartHandshake,
  Sparkles,
  Trophy,
  Star,
  CalendarCheck,
  PhoneCall,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Counter } from "@/components/site/Counter";
import hero from "@/assets/Campus1.jpeg";
import campus from "@/assets/campus3.jpeg";
import creche from "@/assets/Creche.jpeg";
import nursery from "@/assets/Nursery.jpeg";
import kindergarten from "@/assets/KG.jpeg";
import primary from "@/assets/Primary.jpeg";
import jhs from "@/assets/Jhs.jpeg";
import graduation from "@/assets/GRADUATION.jpeg";
import sports from "@/assets/SPORTS.jpeg";
import cultural from "@/assets/Cultural.jpeg";
import library from "@/assets/LIBRARY.jpeg";
import excursion from "@/assets/EXCURSION1.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adonai International School | Premier Private School in Tema West, Ghana" },
      { name: "description", content: "Premier private international school in Adjei Kojo, Tema West offering Creche, Nursery, Kindergarten, Primary and Junior High School. Apply today." },
      { property: "og:title", content: "Adonai International School — Discipline & Hard Work" },
      { property: "og:description", content: "Nurturing future leaders through Excellence, Discipline and Innovation in Tema West, Ghana." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative isolate -mt-20 overflow-hidden pt-20 text-white">
        <div className="absolute inset-0 -z-10">
          <img src={hero} alt="Students learning in a bright classroom at Adonai International School" className="h-full w-full object-cover" width={1920} height={1280} fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.22_0.08_252)]/92 via-[oklch(0.30_0.10_252)]/85 to-[oklch(0.22_0.08_252)]/70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(212,175,55,0.30),transparent_55%)]" />
        </div>
        <div className="container-x relative grid min-h-[88vh] items-center py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex animate-[fade-in_0.6s_ease-out] items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-gold backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Discipline · Hard Work
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Nurturing Future Leaders Through{" "}
              <span className="text-gradient-gold">Excellence</span>,{" "}
              <span className="text-gradient-gold">Discipline</span> and{" "}
              <span className="text-gradient-gold">Innovation</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/85 md:text-xl">
              Providing quality education that develops confident, responsible, and globally competitive learners — from Creche to Junior High School in Tema West, Ghana.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/admissions" className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-gold-foreground shadow-[var(--shadow-gold)] transition hover:scale-[1.02]">
                Apply Now <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15">
                <CalendarCheck className="h-4 w-4" /> Schedule a Visit
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/75">
              <div className="flex items-center gap-2"><Star className="h-4 w-4 fill-gold text-gold" /> 95% academic success rate</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold" /> Safe, family-oriented campus</div>
              <div className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-gold" /> Creche to JHS</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative -mt-12 md:-mt-20">
        <div className="container-x">
          <div className="glass grid grid-cols-2 gap-2 rounded-3xl p-6 shadow-[var(--shadow-elegant)] md:grid-cols-4 md:gap-4 md:p-10">
            {[
              { n: 10, suffix: "+", l: "Years of Excellence" },
              { n: 800, suffix: "+", l: "Students Educated" },
              { n: 30, suffix: "+", l: "Professional Teachers" },
              { n: 95, suffix: "%", l: "Academic Success Rate" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="font-display text-3xl font-extrabold text-primary md:text-5xl">
                  <Counter to={s.n} suffix={s.suffix} />
                </div>
                <div className="mt-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground md:text-sm">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="section-pad">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Why Adonai</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-5xl">An environment where every child thrives</h2>
            <p className="mt-4 text-muted-foreground">Six pillars that shape confident, disciplined, globally competitive learners.</p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { i: GraduationCap, t: "Qualified Teachers", d: "Passionate, certified educators committed to every learner's growth and character." },
              { i: ShieldCheck, t: "Safe Learning Environment", d: "A secure, nurturing campus where children feel valued and protected." },
              { i: Laptop, t: "ICT Integration", d: "Modern classrooms and computer labs equipping pupils for the digital world." },
              { i: HeartHandshake, t: "Moral Training", d: "Faith-based values, respect and integrity woven into daily school life." },
              { i: Trophy, t: "Academic Excellence", d: "Consistent BECE results and a culture of high expectations and effort." },
              { i: Sparkles, t: "Leadership Development", d: "Clubs, prefectship and service that build confident, capable leaders." },
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent opacity-60 transition group-hover:scale-125" aria-hidden />
                <div className="relative">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEVELS */}
      <section className="section-pad bg-secondary/60">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Academic Levels</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-5xl">A learning journey from Creche to JHS</h2>
            </div>
            <Link to="/academics" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
              Explore academics <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {[
              { t: "Creche", d: "Loving care for our youngest learners, from 6 months.", img: creche },
              { t: "Nursery", d: "Play-based foundations for curiosity and confidence.", img: nursery },
              { t: "Kindergarten", d: "Early literacy, numeracy and social skills.", img: kindergarten },
              { t: "Primary", d: "Strong academic foundation with ICT and character.", img: primary },
              { t: "Junior High", d: "BECE excellence with STEM and leadership focus.", img: jhs },
            ].map((lvl) => (
              <article key={lvl.t} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={lvl.img} alt={`${lvl.t} at Adonai International School`} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" width={1200} height={800} />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground">{lvl.t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{lvl.d}</p>
                  <Link to="/academics" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPUS SPLIT */}
      <section className="section-pad">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-2xl bg-gold/40 blur-2xl" aria-hidden />
            <img src={campus} alt="Adonai International School campus exterior" className="relative w-full rounded-3xl object-cover shadow-[var(--shadow-elegant)]" loading="lazy" width={1600} height={1067} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Our Campus</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-5xl">A purpose-built campus in Adjei Kojo</h2>
            <p className="mt-4 text-muted-foreground">Modern classrooms, science and ICT labs, a stocked library, sports fields and safe, supervised play areas — designed so every child can flourish academically, socially and morally.</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Smart classrooms", "Science lab", "ICT lab", "Library", "Sports field", "24/7 security"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-foreground"><span className="h-2 w-2 rounded-full bg-gold" />{f}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-glow">
                About the school <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary">
                Book a tour
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-pad bg-secondary/60">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Voices of Adonai</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-5xl">Trusted by parents. Loved by students.</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { q: "My daughter has grown in confidence and character. Adonai feels like a family that truly invests in each child.", n: "Mrs. Akosua Mensah", r: "Parent, Primary 4" },
              { q: "The teachers know our children by name and by need. The discipline and academic results speak for themselves.", n: "Mr. Kwame Boateng", r: "Parent, JHS 2" },
              { q: "I love my school. We do science, ICT and sports — and our teachers always encourage us to do our best.", n: "Adoma, JHS 3", r: "Head Girl" },
            ].map((t, i) => (
              <figure key={i} className="rounded-2xl border border-border bg-card p-7 shadow-sm">
                <div className="flex gap-1 text-gold">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}</div>
                <blockquote className="mt-4 text-foreground/90">"{t.q}"</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary font-bold text-primary-foreground">{t.n.split(" ").map(s=>s[0]).slice(0,2).join("")}</div>
                  <div>
                    <div className="font-semibold text-foreground">{t.n}</div>
                    <div className="text-xs text-muted-foreground">{t.r}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="section-pad">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Life at Adonai</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-5xl">A glimpse into our school</h2>
            </div>
            <Link to="/gallery" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">Open gallery <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { src: graduation, a: "Graduation ceremony", span: "md:col-span-2 md:row-span-2" },
              { src: sports, a: "Sports day" },
              { src: jhs, a: "Junior High" },
              { src: cultural, a: "Cultural day" },
              { src: library, a: "Library" },
              { src: excursion, a: "Excursion" },
            ].map((g) => (
              <div key={g.a} className={`group relative overflow-hidden rounded-2xl ${g.span ?? ""}`}>
                <img src={g.src} alt={g.a} loading="lazy" width={1200} height={800} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="pointer-events-none absolute bottom-3 left-3 text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100">{g.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary-glow p-10 text-white shadow-[var(--shadow-elegant)] md:p-16">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/30 blur-3xl" aria-hidden />
            <div className="absolute -bottom-32 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" aria-hidden />
            <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Admissions Open</p>
                <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-5xl">Give Your Child the Best Educational Foundation</h2>
                <p className="mt-4 max-w-xl text-white/85">Join a community where discipline, hard work and excellence are a way of life. Apply now or visit our campus in Adjei Kojo, Tema West.</p>
              </div>
              <div className="flex flex-col gap-3">
                <Link to="/admissions" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-semibold text-gold-foreground transition hover:scale-[1.02]">
                  Apply Today <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="tel:+233240218814" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur hover:bg-white/15">
                  <PhoneCall className="h-4 w-4" /> +233 24 021 8814
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
