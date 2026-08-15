import { useEffect, useMemo, useState } from "react";
import PageHero from "../../components/ui/PageHero";
import PageState from "../../components/ui/PageState";
import Reveal from "../../components/ui/Reveal";
import { getProjects } from "../../services/api/projects";
import type { Project } from "../../types/project";
import { getProjectImageSources } from "../../utils/imageAssets";

const ALL_CATEGORIES = "全部";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [failedImageSources, setFailedImageSources] = useState<Set<string>>(new Set());

  useEffect(() => {
    let active = true;

    async function loadProjects() {
      setLoading(true);
      setError(false);
      try {
        const data = await getProjects();
        if (active) setProjects(data);
      } catch (loadError) {
        console.error("Failed to fetch projects", loadError);
        if (active) {
          setProjects([]);
          setError(true);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProjects();
    return () => {
      active = false;
    };
  }, [reloadKey]);

  const projectList = Array.isArray(projects) ? projects : [];

  const categories = useMemo(
    () => [
      ALL_CATEGORIES,
      ...Array.from(
        new Set(projectList.map((project) => project.CATEGORY?.trim()).filter(Boolean)),
      ),
    ],
    [projectList],
  );

  const visibleProjects = useMemo(
    () =>
      selectedCategory === ALL_CATEGORIES
        ? projectList
        : projectList.filter((project) => project.CATEGORY === selectedCategory),
    [projectList, selectedCategory],
  );

  return (
    <div className="min-h-[60vh]">
      <PageHero eyebrow="Projects" title="作品集" description="這些是我近年做過的專案，從前後端架構到AI學習，記錄了各個階段的嘗試。" />
      <section className="section-shell">

      {!loading && !error && projectList.length > 0 && (
        <Reveal><div className="flex flex-wrap gap-2" aria-label="作品分類">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "border border-slate-200 bg-white/80 text-slate-600 hover:border-indigo-300 hover:text-indigo-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div></Reveal>
      )}

      {loading && <PageState kind="loading" />}

      {!loading && error && (
        <PageState kind="error" title="暫時無法取得作品" description="請確認後端服務正在執行後再試一次。" onRetry={() => setReloadKey((key) => key + 1)} />
      )}

      {!loading && !error && projectList.length === 0 && (
        <PageState kind="empty" title="目前還沒有公開作品" description="作品內容之後會陸續更新。" />
      )}

      {!loading && !error && visibleProjects.length > 0 && (
        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => {
            const imageSource = getProjectImageSources(project.ID, project.IMAGE_URL)
              .find((source) => !failedImageSources.has(source));
            const projectUrl = project.PROJECT_URL.trim();
            const card = (
              <article className="surface-card group flex h-full min-w-0 flex-col overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-[0_28px_60px_-30px_rgb(79_70_229_/_0.45)]">
                <div className="flex aspect-[2/1] items-center justify-center overflow-hidden bg-slate-100">
                  {imageSource ? (
                    <img
                      src={imageSource}
                      alt={`${project.TITLE} 專案畫面`}
                      className="h-full w-full scale-110 object-contain transition duration-500 group-hover:scale-[1.14]"
                      onError={() =>
                        setFailedImageSources((current) => new Set(current).add(imageSource))
                      }
                    />
                  ) : (
                    <span className="text-sm font-semibold text-slate-400">{project.TITLE}</span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-indigo-600">{project.CATEGORY || "Project"}</p>
                  <h2 className="mt-3 break-words text-xl font-black tracking-tight text-slate-950">{project.TITLE}</h2>
                  <p className="mt-3 flex-1 break-words leading-7 text-slate-600">{project.DESCRIPTION}</p>
                  {project.TECHNOLOGIES?.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.TECHNOLOGIES.map((technology) => (
                        <span key={technology} className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                          {technology}
                        </span>
                      ))}
                    </div>
                  )}
                  {projectUrl && (
                    <span className="mt-6 inline-flex items-center text-sm font-black text-indigo-700">
                      查看專案 <span aria-hidden="true" className="ml-1 transition group-hover:translate-x-1">↗</span>
                    </span>
                  )}
                </div>
              </article>
            );

            return projectUrl ? (
              <Reveal key={project.ID} className="h-full"><a href={projectUrl} target="_blank" rel="noopener noreferrer" className="block h-full rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600">{card}</a></Reveal>
            ) : (
              <Reveal key={project.ID} className="h-full">{card}</Reveal>
            );
          })}
        </div>
      )}
      </section>
    </div>
  );
}
