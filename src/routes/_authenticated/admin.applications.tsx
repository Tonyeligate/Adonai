import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, Mail, Phone, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/applications")({
  component: AdminApplications,
});

type Application = {
  id: string;
  parent_name: string;
  child_name: string;
  class_applying_for: string;
  phone: string;
  email: string;
  notes: string | null;
  status: string;
  created_at: string;
};

const STATUSES = ["new", "reviewing", "accepted", "rejected"] as const;

function AdminApplications() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setApps((data ?? []) as Application[]);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => filter === "all" ? apps : apps.filter((a) => a.status === filter), [apps, filter]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("applications").update({ status }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    setApps((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this application?")) return;
    const { error } = await supabase.from("applications").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    load();
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: apps.length };
    for (const s of STATUSES) c[s] = apps.filter((a) => a.status === s).length;
    return c;
  }, [apps]);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Admissions Applications</h1>
      <p className="mt-1 text-sm text-muted-foreground">Inquiries submitted through the public Admissions form.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["all", ...STATUSES] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${filter === s ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:border-primary hover:text-primary"}`}>
            {s} <span className="ml-1 text-xs opacity-70">({counts[s] ?? 0})</span>
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {loading && <div className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">Loading…</div>}
        {!loading && filtered.length === 0 && <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">No applications in this view.</div>}
        {filtered.map((a) => {
          const waNumber = a.phone.replace(/[^0-9]/g, "");
          return (
            <article key={a.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-semibold">{a.child_name} <span className="text-sm font-normal text-muted-foreground">— {a.class_applying_for}</span></h2>
                  <p className="text-sm text-muted-foreground">Parent: {a.parent_name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select value={a.status} onChange={(e) => updateStatus(a.id, e.target.value)} className="rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-semibold capitalize">
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <button onClick={() => remove(a.id)} className="rounded-md p-2 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-3 text-xs">
                <a href={`mailto:${a.email}`} className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 hover:border-primary hover:text-primary"><Mail className="h-3.5 w-3.5" /> {a.email}</a>
                <a href={`tel:${a.phone}`} className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 hover:border-primary hover:text-primary"><Phone className="h-3.5 w-3.5" /> {a.phone}</a>
                <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener" className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 hover:border-primary hover:text-primary"><MessageCircle className="h-3.5 w-3.5" /> WhatsApp</a>
                <span className="ml-auto text-muted-foreground">{new Date(a.created_at).toLocaleString()}</span>
              </div>
              {a.notes && <p className="mt-3 rounded-xl bg-secondary/60 p-3 text-sm">{a.notes}</p>}
            </article>
          );
        })}
      </div>
    </div>
  );
}
