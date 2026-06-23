import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  const number = "233240218814";
  const msg = encodeURIComponent("Hello Adonai International School, I'd like to learn more about admissions.");
  return (
    <a
      href={`https://wa.me/${number}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-6px_rgba(37,211,102,0.55)] transition hover:scale-110 sm:bottom-7 sm:right-7"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" aria-hidden />
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
