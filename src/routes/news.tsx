import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import graduation from "@/assets/GRADUATION.jpeg";
import sports from "@/assets/SPORTS.jpeg";
import jhs from "@/assets/Jhs.jpeg";
import cultural from "@/assets/Cultural.jpeg";
import ict from "@/assets/academic-coordinator.jpg";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Events | Adonai International School" },
      { name: "description", content: "Latest news, academic achievements, sports updates and upcoming events at Adonai International School, Tema West." },
      { property: "og:title", content: "News & Events — Adonai International School" },
      { property: "og:description", content: "Stay up to date with Adonai school news, events and achievements." },
      { property: "og:url", content: "/news" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: News,
});

type Post = { id: string; title: string; excerpt: string | null; image_url: string | null; category: string; published_at: string | null; created_at: string };

const fallback: Post[] = [
  { id: "f1", title: "Class of 2025 celebrates JHS graduation", excerpt: "Our JHS 3 leavers were celebrated in a beautiful ceremony attended by parents, staff and dignitaries.", image_url: graduation, category: "School News", published_at: "2025-07-12", created_at: "2025-07-12" },
  { id: "f2", title: "Adonai pupils sweep inter-school science fair", excerpt: "Three first-place awards across robotics, biology and physics categories.", image_url: jhs, category: "Academic Achievements", published_at: "2025-05-22", created_at: "2025-05-22" },
  { id: "f3", title: "Annual sports day brings the community together", excerpt: "A joyful day of athletics, football and tug-of-war across four houses.", image_url: sports, category: "Sports Activities", published_at: "2025-03-08", created_at: "2025-03-08" },
  { id: "f4", title: "Cultural day showcases Ghana's heritage", excerpt: "Pupils dazzled in kente and traditional dress with dance, drumming and storytelling.", image_url: cultural, category: "School News", published_at: "2025-02-15", created_at: "2025-02-15" },
  { id: "f5", title: "New ICT lab officially opens", excerpt: "A modern, fully equipped lab now serves Primary 4 through JHS 3.", image_url: ict, category: "School News", published_at: "2024-11-04", created_at: "2024-11-04" },
];

const categories = ["All", "School News", "Academic Achievements", "Admissions Updates", "Sports Activities", "Upcoming Events"];

function News() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [active, setActive] = useState("All");

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("news_posts")
        .select("id,title,excerpt,image_url,category,published_at,created_at")
        .eq("published", true)
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false });
      setPosts(data && data.length > 0 ? (data as Post[]) : fallback);
    })();
  }, []);

  const list = useMemo(() => {
    const src = posts ?? [];
    return active === "All" ? src : src.filter((p) => p.category === active);
  }, [posts, active]);

  return (
    <SiteLayout>
      <PageHero eyebrow="News & Events" title="What's happening at Adonai." subtitle="Achievements, announcements and stories from across the school." />

      <section className="section-pad">
        <div className="container-x">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setActive(c)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${active === c ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:border-primary hover:text-primary"}`}>{c}</button>
            ))}
          </div>

          {posts === null ? (
            <p className="mt-10 text-sm text-muted-foreground">Loading latest news…</p>
          ) : list.length === 0 ? (
            <p className="mt-10 text-sm text-muted-foreground">No posts in this category yet.</p>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <article key={p.id} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                  <div className="aspect-[16/10] overflow-hidden bg-secondary">
                    {p.image_url && <img src={p.image_url} alt={p.title} loading="lazy" width={1200} height={800} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><Tag className="h-3.5 w-3.5 text-gold" />{p.category}</span>
                      <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{new Date(p.published_at ?? p.created_at).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })}</span>
                    </div>
                    <h2 className="mt-3 font-display text-lg font-semibold leading-snug">{p.title}</h2>
                    {p.excerpt && <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>}
                    <Link to="/contact" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                      Read more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
