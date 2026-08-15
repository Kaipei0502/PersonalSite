import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageState from "../../components/ui/PageState";
import Reveal from "../../components/ui/Reveal";
import SectionHeading from "../../components/ui/SectionHeading";
import { contactLinks } from "../../config/site";
import { getProfile } from "../../services/api/profile";
import type { Profile } from "../../types/profile";
import { getProfileImage } from "../../utils/imageAssets";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "ME";
  if (parts.length === 1) return Array.from(parts[0]).slice(0, 2).join("").toUpperCase();
  return parts.slice(0, 2).map((part) => Array.from(part)[0]).join("").toUpperCase();
}

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function getSkillCategoryIcon(categoryName: string) {
  const icons: Record<string, string> = {
    Frontend: "</>",
    Backend: "{ }",
    "Database & SQL": "DB",
    "Development Tools": "⌘",
  };

  return icons[categoryName] ?? categoryName.slice(0, 2).toUpperCase();
}

export default function AboutPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [profileImageFailed, setProfileImageFailed] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadData() {
      setLoading(true);
      setError(false);
      try {
        const profileData = await getProfile();
        if (active) {
          setProfile(profileData);
        }
      } catch (loadError) {
        console.error("Failed to fetch about data", loadError);
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadData();
    return () => {
      active = false;
    };
  }, [reloadKey]);

  if (loading) {
    return <PageState kind="loading" />;
  }

  if (error || !profile) {
    return (
      <section className="section-shell flex min-h-[60vh] items-center !max-w-3xl">
        <div className="w-full"><PageState kind="error" title="暫時無法取得個人資料" description="請確認後端與資料庫服務後再試一次。" onRetry={() => setReloadKey((key) => key + 1)} /></div>
      </section>
    );
  }

  const profileImage = getProfileImage();
  const aboutContent = profile.ABOUT_DESCRIPTION?.trim() || profile.DESCRIPTION?.trim() || "";
  const aboutParagraphs = aboutContent
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div className="overflow-hidden">
      <section className="relative border-b border-slate-200/80 bg-white/45">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_12%,rgba(129,140,248,0.2),transparent_34%),radial-gradient(circle_at_12%_28%,rgba(56,189,248,0.18),transparent_30%)]" />
        <div className="section-shell relative grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-20">
          <Reveal>
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-indigo-600">About me</p>
            <h1 className="mt-7 text-4xl font-black leading-tight tracking-[-0.05em] text-slate-950 sm:text-6xl">
              Hi, I'm <span className="text-gradient">{profile.NAME}</span>
            </h1>
            <p className="mt-5 text-lg font-bold text-slate-700 sm:text-xl">{profile.TITLE}</p>
            <p className="mt-6 max-w-2xl whitespace-pre-line text-base leading-8 text-slate-600 sm:text-lg">{profile.DESCRIPTION}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/projects" className="button-primary group">
                查看我的作品 <ArrowIcon />
              </Link>
              {profile.RESUME_LINK && (
                <a href={profile.RESUME_LINK} target="_blank" rel="noreferrer noopener" className="button-secondary">
                  查看履歷 <ArrowIcon />
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={120} className="mx-auto w-full max-w-[17rem] sm:max-w-xs lg:mr-0">
          <aside className="relative">
            <div className="absolute -inset-3 rotate-3 rounded-[2rem] bg-gradient-to-br from-sky-200/70 to-violet-200/70" />
            <div className="relative rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_28px_75px_-32px_rgba(79,70,229,0.4)] backdrop-blur">
              <div className="flex aspect-[604/829] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-900">
                {profileImage && !profileImageFailed ? (
                  <img
                    src={profileImage}
                    alt={`${profile.NAME} 的個人照片`}
                    className="h-full w-full object-contain object-center"
                    onError={() => setProfileImageFailed(true)}
                  />
                ) : (
                  <span className="text-6xl font-black tracking-tighter text-white">{getInitials(profile.NAME)}</span>
                )}
              </div>
              <h2 className="mt-6 text-2xl font-bold text-slate-950">{profile.NAME}</h2>
              <p className="mt-1 text-sm font-bold text-indigo-700">{profile.TITLE}</p>
            </div>
          </aside>
          </Reveal>
        </div>
      </section>

      <section className="section-shell">
        <Reveal>
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="My story" title="關於我的一些事" />
          </div>
          <div className="space-y-5 text-base leading-8 text-slate-600 sm:text-lg">
            {aboutParagraphs.map((paragraph, index) => (
              <p key={`${index}-${paragraph.slice(0, 24)}`} className="whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        </Reveal>
      </section>

      <section className="border-y border-slate-200/80 bg-white/70">
        <div className="section-shell">
        <Reveal>
        <div>
          <SectionHeading eyebrow="Toolkit" title="技術與工具" />
          {(profile.SKILL_CATEGORIES ?? []).length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {(profile.SKILL_CATEGORIES ?? []).map((category, index) => (
              <article key={category.ID} className="surface-card group p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-indigo-500">{String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-3 text-xl font-black text-slate-950">{category.NAME}</h3>
                  </div>
                  <span
                    className="flex h-11 min-w-11 items-center justify-center rounded-2xl border border-indigo-100 bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-100 px-2 font-mono text-xs font-black text-indigo-700 shadow-sm transition duration-300 group-hover:-rotate-3 group-hover:scale-105 group-hover:shadow-md"
                    aria-hidden="true"
                  >
                    {getSkillCategoryIcon(category.NAME)}
                  </span>
                </div>
                {category.DESCRIPTION && <p className="mt-4 leading-7 text-slate-600">{category.DESCRIPTION}</p>}
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${category.NAME} 技能`}>
                  {(category.SKILLS ?? []).map((skill) => (
                    <li key={skill.ID} className="rounded-full border border-indigo-100 bg-indigo-50/70 px-3 py-1.5 text-xs font-bold text-indigo-700 sm:text-sm">{skill.NAME}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center text-slate-500">
              技能資料整理中。
            </div>
          )}
        </div>
        </Reveal>
        </div>
      </section>

      <section className="section-shell !max-w-4xl">
        <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-7 text-white shadow-2xl shadow-indigo-950/15 sm:p-10">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl" />
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">Contact</p>
          <h2 className="mt-4 text-3xl font-bold">和我聯絡</h2>
          <p className="mt-4 max-w-xl leading-7 text-slate-300">
            歡迎聊聊工作機會、專案合作，或任何有趣的產品想法。
          </p>
          <ul className="mt-8 space-y-3">
            {contactLinks.map((contact) => (
              <li key={contact.label}>
                <a
                  href={contact.href}
                  target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={contact.href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
                  className="group flex items-center justify-between gap-5 rounded-2xl border border-slate-800 px-5 py-4 transition hover:border-sky-500 hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                >
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-sky-400">
                      {contact.label}
                    </span>
                    <span className="mt-1 block break-all font-medium text-slate-100">
                      {contact.value}
                    </span>
                  </span>
                  <span className="shrink-0 text-xl text-slate-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-400" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        </Reveal>
      </section>
    </div>
  );
}
