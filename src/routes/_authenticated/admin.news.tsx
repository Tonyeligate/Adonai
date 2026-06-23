import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/news")({
  component: AdminNews,
});

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string | null;
  image_url: string | null;
  category: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
};

const CATEGORIES = ["School News", "Academic Achievements", "Admissions Updates", "Sports Activities", "Upcoming Events"];

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}

function AdminNews() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Partial<Post> | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("news_posts").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setPosts((data ?? []) as Post[]);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    const payload = {
      title: editing.title?.trim() ?? "",
      slug: editing.slug?.trim() || slugify(editing.title ?? ""),
      excerpt: editing.excerpt ?? null,
      body: editing.body ?? null,
      image_url: editing.image_url ?? null,
      category: editing.category ?? "School News",
      published: editing.published ?? false,
      published_at: editing.published ? (editing.published_at ?? new Date().toISOString()) : null,
    };
    if (!payload.title) { toast.error("Title is required"); return; }
    const { error } = editing.id
      ? await supabase.from("news_posts").update(payload).eq("id", editing.id)
      : await supabase.from("news_posts").insert(payload);
    if (error) { toast.error(error.message); return; }
    toast.success("Saved");
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("news_posts").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    load();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">News & Events</h1>
          <p className="mt-1 text-sm text-muted-foreground">Posts marked Published appear instantly on the public News page.</p>
        </div>
        <button onClick={() => setEditing({ category: "School News", published: true })} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-glow">
          <Plus className="h-4 w-4" /> New post
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="p-3">Title</th><th className="p-3">Category</th><th className="p-3">Status</th><th className="p-3">Date</th><th className="p-3"></th></tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">Loading…</td></tr>}
            {!loading && posts.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">No posts yet. Create your first one.</td></tr>}
            {posts.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="p-3 font-medium">{p.title}</td>
                <td className="p-3 text-muted-foreground">{p.category}</td>
                <td className="p-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${p.published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {p.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="p-3 text-muted-foreground">{new Date(p.published_at ?? p.created_at).toLocaleDateString()}</td>
                <td className="p-3 text-right">
                  <button onClick={() => setEditing(p)} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs hover:bg-secondary"><Pencil className="h-3.5 w-3.5" /> Edit</button>
                  <button onClick={() => remove(p.id)} className="ml-1 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-destructive hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-2xl rounded-2xl bg-card p-6 shadow-2xl md:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">{editing.id ? "Edit post" : "New post"}</h2>
              <button onClick={() => setEditing(null)} className="rounded-full p-1 hover:bg-secondary"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-5 grid gap-4">
              <Input label="Title" value={editing.title ?? ""} onChange={(v) => setEditing({ ...editing, title: v, slug: editing.id ? editing.slug : slugify(v) })} />
              <Input label="Slug" value={editing.slug ?? ""} onChange={(v) => setEditing({ ...editing, slug: v })} />
              <Input label="Image URL" value={editing.image_url ?? ""} onChange={(v) => setEditing({ ...editing, image_url: v })} placeholder="https://…" />
              <label className="text-sm font-medium">Category
                <select value={editing.category ?? "School News"} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="mt-1.5 block w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm">
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </label>
              <label className="text-sm font-medium">Excerpt
                <textarea value={editing.excerpt ?? ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} rows={2} className="mt-1.5 block w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm" />
              </label>
              <label className="text-sm font-medium">Body
                <textarea value={editing.body ?? ""} onChange={(e) => setEditing({ ...editing, body: e.target.value })} rows={6} className="mt-1.5 block w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm" />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={!!editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} />
                Published (visible on public site)
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">Cancel</button>
              <button onClick={save} className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-glow">Save post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="text-sm font-medium">{label}
      <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="mt-1.5 block w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm" />
    </label>
  );
}
