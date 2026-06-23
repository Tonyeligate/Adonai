import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Newspaper, Image as ImageIcon, ClipboardList, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [stats, setStats] = useState({ news: 0, gallery: 0, applications: 0, newApps: 0 });

  useEffect(() => {
    (async () => {
      const [news, gallery, apps, newApps] = await Promise.all([
        supabase.from("news_posts").select("*", { count: "exact", head: true }),
        supabase.from("gallery_items").select("*", { count: "exact", head: true }),
        supabase.from("applications").select("*", { count: "exact", head: true }),
        supabase.from("applications").select("*", { count: "exact", head: true }).eq("status", "new"),
      ]);
      setStats({
        news: news.count ?? 0,
        gallery: gallery.count ?? 0,
        applications: apps.count ?? 0,
        newApps: newApps.count ?? 0,
      });
    })();
  }, []);

  const cards = [
    { to: "/admin/news", label: "News posts", value: stats.news, icon: Newspaper },
    { to: "/admin/gallery", label: "Gallery items", value: stats.gallery, icon: ImageIcon },
    { to: "/admin/applications", label: "Total applications", value: stats.applications, icon: ClipboardList },
    { to: "/admin/applications", label: "New applications", value: stats.newApps, icon: TrendingUp },
  ] as const;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Welcome back</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage news, photos and admissions from one place.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ to, label, value, icon: Icon }) => (
          <Link key={label} to={to} className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="mt-3 font-display text-4xl font-bold text-primary">{value}</div>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg font-bold">Quick start</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Add a news article — it will appear immediately on the public News page when marked Published.</li>
          <li>Upload gallery photos by pasting an image URL (Unsplash, your CDN, etc.).</li>
          <li>Review incoming admissions and update their status to keep your pipeline organized.</li>
        </ul>
      </div>
    </div>
  );
}
