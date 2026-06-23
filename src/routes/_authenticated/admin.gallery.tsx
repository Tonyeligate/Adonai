import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, Plus, X, Pencil } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/gallery")({
  component: AdminGallery,
});

type Item = {
  id: string;
  image_url: string;
  caption: string;
  category: string;
  sort_order: number;
};

const CATEGORIES = ["Graduation", "Sports", "Excursions", "Science", "Cultural", "Classroom", "Facilities"];

function AdminGallery() {
  const [items, setItems] = useState<Item[]>([]);
  const [editing, setEditing] = useState<Partial<Item> | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("gallery_items").select("*").order("sort_order").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setItems((data ?? []) as Item[]);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    const payload = {
      image_url: editing.image_url?.trim() ?? "",
      caption: editing.caption?.trim() ?? "",
      category: editing.category ?? "Campus",
      sort_order: Number(editing.sort_order ?? 0),
    };
    if (!payload.image_url || !payload.caption) { toast.error("Image URL and caption are required"); return; }
    const { error } = editing.id
      ? await supabase.from("gallery_items").update(payload).eq("id", editing.id)
      : await supabase.from("gallery_items").insert(payload);
    if (error) { toast.error(error.message); return; }
    toast.success("Saved");
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this photo?")) return;
    const { error } = await supabase.from("gallery_items").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    load();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Gallery</h1>
          <p className="mt-1 text-sm text-muted-foreground">Add or remove photos shown on the public Gallery page.</p>
        </div>
        <button onClick={() => setEditing({ category: "Campus", sort_order: 0 })} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-glow">
          <Plus className="h-4 w-4" /> Add photo
        </button>
      </div>

      {loading ? (
        <div className="mt-10 text-center text-sm text-muted-foreground">Loading…</div>
      ) : items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
          No photos yet. Add your first one.
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="aspect-[4/3] bg-secondary">
                <img src={it.image_url} alt={it.caption} className="h-full w-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gold">{it.category}</div>
                    <div className="mt-1 text-sm font-medium">{it.caption}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setEditing(it)} className="rounded-md p-2 hover:bg-secondary"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => remove(it.id)} className="rounded-md p-2 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-lg rounded-2xl bg-card p-6 shadow-2xl md:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">{editing.id ? "Edit photo" : "Add photo"}</h2>
              <button onClick={() => setEditing(null)} className="rounded-full p-1 hover:bg-secondary"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-5 grid gap-4">
              <label className="text-sm font-medium">Image URL
                <input value={editing.image_url ?? ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} placeholder="https://…" className="mt-1.5 block w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm" />
              </label>
              {editing.image_url && <img src={editing.image_url} alt="" className="aspect-[4/3] w-full rounded-xl object-cover" />}
              <label className="text-sm font-medium">Caption
                <input value={editing.caption ?? ""} onChange={(e) => setEditing({ ...editing, caption: e.target.value })} className="mt-1.5 block w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm" />
              </label>
              <label className="text-sm font-medium">Category
                <select value={editing.category ?? "Campus"} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="mt-1.5 block w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm">
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  <option>Campus</option>
                </select>
              </label>
              <label className="text-sm font-medium">Sort order
                <input type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} className="mt-1.5 block w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm" />
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">Cancel</button>
              <button onClick={save} className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-glow">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
