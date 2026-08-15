import { contactLinks } from "../../config/site";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] md:items-end lg:px-8">
        <div>
          <p className="text-lg font-black tracking-tight">CHANG KAI PEI</p>
          <p className="mt-2 max-w-lg text-sm leading-7 text-slate-400">
            專注於打造清楚、可靠且真正解決使用者問題的數位產品。
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-3" aria-label="社群與聯絡連結">
          {contactLinks.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={contact.href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
              className="text-sm font-bold text-slate-300 transition hover:text-sky-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
            >
              {contact.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      </div>
      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-slate-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Chang Kai Pei. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
