import { useEffect, useState } from "react";
import PageHero from "../../components/ui/PageHero";
import PageState from "../../components/ui/PageState";
import Reveal from "../../components/ui/Reveal";
import { getProfile } from "../../services/api/profile";
import type { Experience } from "../../types/profile";

function formatDate(dateString: string, fallback = "至今") {
  if (!dateString) return fallback;

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime()) || date.getFullYear() <= 1) return fallback;

  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "short",
  }).format(date);
}

function getDuration(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const parsedEnd = new Date(endDate);
  const end = !endDate || Number.isNaN(parsedEnd.getTime()) || parsedEnd.getFullYear() <= 1
    ? new Date()
    : parsedEnd;

  if (Number.isNaN(start.getTime()) || end < start) return "";

  const totalMonths = Math.max(
    1,
    (end.getFullYear() - start.getFullYear()) * 12 +
      end.getMonth() -
      start.getMonth() +
      1,
  );
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return [years ? `${years} 年` : "", months ? `${months} 個月` : ""]
    .filter(Boolean)
    .join(" ");
}

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    async function fetchData() {
      setLoading(true);
      setError(false);

      try {
        const data = await getProfile();
        if (active) setExperiences(data.EXPERIENCES ?? []);
      } catch (loadError) {
        console.error("Failed to fetch profile data", loadError);
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchData();
    return () => {
      active = false;
    };
  }, [reloadKey]);

  return (
    <div className="min-h-[60vh]">
      <PageHero eyebrow="Experience" title="工作經驗" description="這裡記錄我的職涯歷程、參與的工作內容，以及在每段經歷中累積的技能與成果。" />

      <section className="section-shell !max-w-6xl">
        {loading && <PageState kind="loading" />}

        {!loading && error && (
          <PageState kind="error" title="暫時無法取得工作經驗" description="請確認後端與資料庫服務正在執行後再試一次。" onRetry={() => setReloadKey((key) => key + 1)} />
        )}

        {!loading && !error && experiences.length === 0 && (
          <PageState kind="empty" title="目前還沒有工作經驗資料" />
        )}

        {!loading && !error && experiences.length > 0 && (
          <Reveal><ol className="relative space-y-8 before:absolute before:bottom-8 before:left-[0.6875rem] before:top-8 before:w-px before:bg-gradient-to-b before:from-sky-400 before:via-indigo-300 before:to-violet-300 sm:space-y-10 sm:before:left-[7.75rem]">
            {experiences.map((experience, index) => {
              const duration = getDuration(experience.ST_DATE, experience.END_DATE);

              return (
                <li
                  key={experience.ID}
                  className="relative grid min-w-0 grid-cols-[1.5rem_minmax(0,1fr)] gap-4 sm:grid-cols-[7rem_1.5rem_minmax(0,1fr)] sm:gap-5"
                >
                  <div className="hidden pt-7 text-right sm:block">
                    <p className="text-sm font-bold text-slate-700">
                      {formatDate(experience.ST_DATE, "")}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {formatDate(experience.END_DATE)}
                    </p>
                  </div>

                  <div className="relative z-10 mt-7 flex h-6 w-6 items-center justify-center rounded-full border-4 border-slate-50 bg-gradient-to-br from-sky-500 to-indigo-600 shadow-md shadow-indigo-300/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </div>

                  <article className="surface-card min-w-0 overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_28px_60px_-32px_rgb(79_70_229_/_0.45)]">
                    <header className="border-b border-slate-100 px-5 py-6 sm:px-7">
                      <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            {index === 0 && (
                              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                                最新經歷
                              </span>
                            )}
                          </div>
                          <h2 className="mt-4 break-words text-2xl font-bold tracking-tight text-slate-950">
                            {experience.ROLE}
                          </h2>
                          <p className="mt-1 break-words text-base font-semibold text-indigo-700">
                            {experience.COMPANY}
                          </p>
                        </div>

                        <div className="shrink-0 rounded-xl bg-slate-50 px-4 py-3 text-sm lg:text-right">
                          <p className="font-semibold text-slate-700 sm:hidden">
                            {formatDate(experience.ST_DATE, "")} — {formatDate(experience.END_DATE)}
                          </p>
                          {duration && (
                            <p className="mt-1 text-xs font-medium text-slate-500 lg:mt-0">
                              {duration}
                            </p>
                          )}
                        </div>
                      </div>
                    </header>

                    <div className="px-5 py-6 sm:px-7 sm:py-7">
                      {experience.SUMMARY && (
                        <p className="whitespace-pre-line break-words text-base leading-8 text-slate-600">
                          {experience.SUMMARY}
                        </p>
                      )}

                      {experience.HIGHLIGHTS?.length > 0 && (
                        <div className="mt-7">
                          <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">
                            主要成果
                          </h3>
                          <ul className="mt-4 space-y-3">
                            {experience.HIGHLIGHTS.map((highlight, highlightIndex) => (
                              <li key={`${experience.ID}-${highlightIndex}`} className="flex min-w-0 gap-3 text-sm leading-7 text-slate-600 sm:text-base">
                                <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                                <span className="min-w-0 break-words">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {experience.SKILLS?.length > 0 && (
                        <div className="mt-7 flex flex-wrap gap-2 border-t border-slate-100 pt-6">
                          {experience.SKILLS.map((skill) => (
                            <span key={skill} className="max-w-full break-all rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 sm:text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </li>
              );
            })}
          </ol></Reveal>
        )}
      </section>
    </div>
  );
}
