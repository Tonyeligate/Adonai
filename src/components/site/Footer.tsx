import { Link } from "@tanstack/react-router";
import { Phone, MapPin, Mail, Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 bg-[oklch(0.20_0.05_255)] text-[oklch(0.95_0.01_250)]">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/15 bg-white/10 font-display text-lg font-bold text-gold">
              A
            </div>
            <div>
              <div className="font-display text-lg font-bold">Adonai International</div>
              <div className="text-xs uppercase tracking-[0.18em] text-white/60">Discipline · Hard Work</div>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm text-white/70">
            Nurturing future leaders through excellence, discipline and innovation — from Creche to Junior High School in Adjei Kojo, Tema West.
          </p>
          <div className="mt-5 flex gap-2">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social link" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:border-gold hover:text-gold">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-gold">Explore</h3>
          <ul className="space-y-2.5 text-sm">
            {[
              ["/about", "About Us"],
              ["/academics", "Academics"],
              ["/admissions", "Admissions"],
              ["/gallery", "Gallery"],
              ["/news", "News & Events"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}><Link to={to} className="text-white/75 transition hover:text-gold">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-gold">Levels</h3>
          <ul className="space-y-2.5 text-sm text-white/75">
            <li>Creche</li><li>Nursery</li><li>Kindergarten</li><li>Primary School</li><li>Junior High School</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-gold">Contact</h3>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Adjei Kojo, Tema West, Ghana</li>
            <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> <a href="tel:+233240218814" className="hover:text-gold">+233 24 021 8814</a></li>
            <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> <a href="tel:+233546571438" className="hover:text-gold">+233 54 657 1438</a></li>
            <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> <a href="mailto:info@adonaischool.edu.gh" className="hover:text-gold">info@adonaischool.edu.gh</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Adonai International School. All rights reserved.</p>
          <p>Trained to lead. Called to serve.</p>
        </div>
      </div>
    </footer>
  );
}
