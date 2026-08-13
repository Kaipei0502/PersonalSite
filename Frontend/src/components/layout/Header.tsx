import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navigationLinks } from "../../config/site";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative block rounded-full px-4 py-2 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
      isActive
        ? "bg-slate-950 text-white shadow-lg shadow-slate-900/10"
        : "text-slate-600 hover:bg-white hover:text-indigo-700"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/80 bg-slate-50/75 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex min-w-0 items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600" onClick={closeMenu}>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-600 to-violet-600 text-sm font-black text-white shadow-lg shadow-indigo-500/25 transition group-hover:-rotate-3 group-hover:scale-105">
            KP
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-black tracking-[0.12em] text-slate-950 sm:text-base">CHANG KAI PEI</span>
            <span className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:block">Software Engineer</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-slate-200/80 bg-white/65 p-1.5 shadow-sm md:flex" aria-label="主要導覽">
          {navigationLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={"end" in link ? link.end : undefined} className={getLinkClass} onClick={closeMenu}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 md:hidden"
          aria-label={isMenuOpen ? "關閉選單" : "開啟選單"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            {isMenuOpen ? <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" /> : <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <nav id="mobile-navigation" className="animate-menu-in border-t border-slate-200/80 bg-white/95 px-4 py-4 shadow-xl md:hidden" aria-label="手機導覽">
          <div className="mx-auto grid max-w-7xl gap-1.5">
            {navigationLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={"end" in link ? link.end : undefined} className={getLinkClass} onClick={closeMenu}>
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
