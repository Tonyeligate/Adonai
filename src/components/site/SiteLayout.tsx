import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppFab } from "./WhatsAppFab";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="hero-bg relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(212,175,55,0.25),transparent_55%)]" aria-hidden />
      <div className="container-x relative py-20 md:py-28">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">{eyebrow}</p>
        )}
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.05] md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base text-white/85 md:text-lg">{subtitle}</p>
        )}
      </div>
      <div className="h-12 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
