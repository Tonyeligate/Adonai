import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import graduation from "@/assets/GRADUATION.jpeg";
import sports from "@/assets/SPORTS.jpeg";
import excursion from "@/assets/EXCURSION1.jpeg";
import excursion2 from "@/assets/EXCURSION2.jpeg";
import excursion3 from "@/assets/EXCURSION3.jpeg";
import jhs from "@/assets/Jhs.jpeg";
import cultural from "@/assets/Cultural.jpeg";
import kindergarten from "@/assets/KG.jpeg";
import library from "@/assets/LIBRARY.jpeg";
import ict from "@/assets/academic-coordinator.jpg";
import campus from "@/assets/Campus1.jpeg";
import campus2 from "@/assets/campus2.jpeg";
import campus3 from "@/assets/campus3.jpeg";
import creche from "@/assets/Creche.jpeg";
import primary from "@/assets/Primary.jpeg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Adonai International School Photos" },
      { name: "description", content: "Browse photos of graduation, sports, science, cultural day, classrooms and campus life at Adonai International School." },
      { property: "og:title", content: "Gallery — Adonai International School" },
      { property: "og:description", content: "Life at Adonai in pictures." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

type Item = { src: string; alt: string; cat: string };

const fallback: Item[] = [
  { src: graduation, alt: "Graduation ceremony", cat: "Graduation" },
  { src: sports, alt: "Inter-house sports", cat: "Sports" },
  { src: excursion, alt: "School excursion", cat: "Excursions" },
  { src: excursion2, alt: "School excursion", cat: "Excursions" },
  { src: excursion3, alt: "School excursion", cat: "Excursions" },
  { src: jhs, alt: "Junior High School class", cat: "Classroom" },
  { src: cultural, alt: "Cultural day performance", cat: "Cultural" },
  { src: kindergarten, alt: "Kindergarten storytime", cat: "Classroom" },
  { src: creche, alt: "Creche classroom", cat: "Classroom" },
  { src: primary, alt: "Primary school classroom", cat: "Classroom" },
  { src: library, alt: "Library reading hour", cat: "Facilities" },
  { src: campus, alt: "School campus", cat: "Facilities" },
  { src: campus2, alt: "School campus", cat: "Facilities" },
  { src: campus3, alt: "School campus", cat: "Facilities" },
  { src: ict, alt: "ICT lab session", cat: "Classroom" },
];

function Gallery() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [active, setActive] = useState<string>("All");
  const [open, setOpen] = useState<Item | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("gallery_items")
        .select("image_url,caption,category")
        .order("sort_order")
        .order("created_at", { ascending: false });
      const mapped: Item[] = (data ?? []).map((r) => ({ src: r.image_url, alt: r.caption, cat: r.category }));
      setItems(mapped.length > 0 ? mapped : fallback);
    })();
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set((items ?? fallback).map((i) => i.cat)));
    return ["All", ...cats];
  }, [items]);

  const list = useMemo(() => {
    const src = items ?? [];
    return active === "All" ? src : src.filter((i) => i.cat === active);
  }, [items, active]);

  return (
    <SiteLayout>
      <PageHero eyebrow="Gallery" title="Moments that make Adonai." subtitle="Filter by category to explore life across our campus." />

      <section className="section-pad">
        <div className="container-x">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setActive(c)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${active === c ? "bg-primary text-primary-foreground shadow" : "border border-border bg-card hover:border-primary hover:text-primary"}`}>{c}</button>
            ))}
          </div>

          {items === null ? (
            <p className="mt-10 text-sm text-muted-foreground">Loading photos…</p>
          ) : list.length === 0 ? (
            <p className="mt-10 text-sm text-muted-foreground">No photos in this category yet.</p>
          ) : (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((it) => (
                <button key={it.src + it.alt} onClick={() => setOpen(it)} className="group relative overflow-hidden rounded-2xl">
                  <img src={it.src} alt={it.alt} loading="lazy" width={1200} height={800} className="aspect-[4/3] h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="pointer-events-none absolute bottom-3 left-4 text-left text-white opacity-0 transition group-hover:opacity-100">
                    <div className="text-xs uppercase tracking-wider text-gold">{it.cat}</div>
                    <div className="text-sm font-semibold">{it.alt}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {open && (
        <div role="dialog" aria-modal="true" aria-label={open.alt} className="fixed inset-0 z-[60] grid place-items-center bg-black/80 p-4" onClick={() => setOpen(null)}>
          <button aria-label="Close" className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"><X /></button>
          <img src={open.src} alt={open.alt} className="max-h-[85vh] w-auto rounded-2xl shadow-2xl" />
        </div>
      )}
    </SiteLayout>
  );
}
