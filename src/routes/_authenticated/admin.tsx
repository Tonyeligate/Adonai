import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, Newspaper, Image as ImageIcon, ClipboardList, LogOut, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/news", label: "News", icon: Newspaper, exact: false },
  { to: "/admin/gallery", label: "Gallery", icon: ImageIcon, exact: false },
  { to: "/admin/applications", label: "Applications", icon: ClipboardList, exact: false },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) { navigate({ to: "/auth" }); return; }
      if (!cancelled) setEmail(u.user.email ?? "");
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", u.user.id);
      const admin = (roles ?? []).some((r) => r.role === "admin");
      if (!cancelled) { setIsAdmin(admin); setChecking(false); }
    })();
    return () => { cancelled = true; };
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/auth" });
  };

  if (checking) {
    return <div className="grid min-h-dvh place-items-center text-sm text-muted-foreground">Loading admin portal…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="grid min-h-dvh place-items-center bg-secondary/40 p-6">
        <div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-soft)]">
          <h1 className="font-display text-2xl font-bold">Awaiting access</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You are signed in as <span className="font-semibold text-foreground">{email}</span>, but your account
            does not yet have admin access. Please contact the site administrator and share this email so they can
            grant you the <span className="font-mono">admin</span> role.
          </p>
          <button onClick={signOut} className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-dvh grid-cols-1 bg-secondary/40 lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-border bg-card p-5 lg:border-b-0 lg:border-r">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground font-display font-bold">A</div>
          <div>
            <div className="font-display text-sm font-bold text-primary">Adonai CMS</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Admin Portal</div>
          </div>
        </Link>
        <nav className="mt-6 flex flex-row flex-wrap gap-1 lg:flex-col">
          {nav.map(({ to, label, icon: Icon, exact }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact }}
              activeProps={{ className: "bg-primary text-primary-foreground" }}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary"
            >
              <Icon className="h-4 w-4" /> {label}
            </Link>
          ))}
        </nav>
        <div className="mt-6 hidden border-t border-border pt-4 lg:block">
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Signed in</div>
          <div className="mt-1 truncate text-xs font-medium">{email}</div>
          <a href="/" target="_blank" rel="noopener" className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline">
            <ExternalLink className="h-3 w-3" /> View live site
          </a>
          <button onClick={signOut} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold hover:border-primary hover:text-primary">
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </aside>
      <main className="p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}
