import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../../components/ui/Reveal";
import SectionHeading from "../../components/ui/SectionHeading";
import PageState from "../../components/ui/PageState";
import { getProfile } from "../../services/api/profile";
import { getFeaturedProjects } from "../../services/api/projects";
import type { Profile } from "../../types/profile";
import type { Project } from "../../types/project";
import { getProfileImage, getProjectImageSources } from "../../utils/imageAssets";

export default function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileImageFailed, setProfileImageFailed] = useState(false);
  const [failedImageSources, setFailedImageSources] = useState<Set<string>>(new Set());

  useEffect(() => {
    let active = true;

    async function fetchData() {
      const [profileData, projectsData] = await Promise.all([
        getProfile().catch(() => null),
        getFeaturedProjects().catch(() => []),
      ]);
      if (active) {
        setProfile(profileData);
        setProjects(projectsData ?? []);
        setLoading(false);
      }
    }

    fetchData();
    return () => { active = false; };
  }, []);

  if (loading) return <PageState kind="loading" />;

  const profileImage = getProfileImage();
  return (
    <div className="min-w-0 overflow-hidden">
      <section className="relative isolate">
        <div className="absolute left-[8%] top-12 -z-10 h-56 w-56 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="absolute right-[4%] top-24 -z-10 h-72 w-72 rounded-full bg-violet-300/30 blur-3xl" />
        <div className="section-shell grid min-h-[calc(100vh-4.5rem)] items-center gap-14 !py-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20 lg:!py-20">
          <Reveal>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.08] tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl">
              Hi, I'm <span className="text-gradient">{profile?.NAME || "Kai Pei"}</span>
            </h1>
            <p className="mt-5 text-lg font-bold text-slate-700 sm:text-xl">{profile?.TITLE || "Software Developer"}</p>
            <p className="mt-6 max-w-2xl whitespace-pre-line text-base leading-8 text-slate-600 sm:text-lg">
              {profile?.DESCRIPTION || "用技術與產品思維，打造清楚、可靠且好用的數位體驗。"}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/projects" className="button-primary group">
                View Projects <span className="transition group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
              <Link to="/about" className="button-secondary group">
                About Me <span className="transition group-hover:translate-x-1" aria-hidden="true">↗</span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120} className="mx-auto w-full max-w-[15rem] sm:max-w-xs lg:mr-0">
            <div className="animate-float relative">
              <div className="absolute -inset-4 rotate-3 rounded-[2.5rem] bg-gradient-to-br from-sky-300/55 via-indigo-300/40 to-violet-300/55 blur-sm" />
              <div className="relative overflow-hidden rounded-[2.25rem] border border-white/80 bg-white p-3 shadow-[0_35px_90px_-35px_rgb(30_41_59_/_0.5)] sm:p-4">
                <div className="aspect-[604/829] overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-slate-100 to-indigo-100">
                  {profileImage && !profileImageFailed ? (
                    <img src={profileImage} alt={`${profile?.NAME || "Kai Pei"} 的個人照片`} className="h-full w-full object-cover" onError={() => setProfileImageFailed(true)} />
                  ) : (
                    <div className="flex h-full items-center justify-center text-6xl font-black text-indigo-600">KP</div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-slate-200/80 bg-white/70">
        <div className="section-shell">
          <Reveal>
            <SectionHeading eyebrow="Selected work" title="精選專案" description="從需求拆解、介面設計到功能實作，這些作品記錄了我解決問題的過程。" centered />
          </Reveal>

          {projects.length > 0 ? (
            <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => {
                const imageSource = getProjectImageSources(project.ID, project.IMAGE_URL).find((source) => !failedImageSources.has(source));
                const projectUrl = project.PROJECT_URL.trim();
                const content = (
                  <article className="surface-card group flex h-full min-w-0 flex-col overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-[0_28px_60px_-30px_rgb(79_70_229_/_0.45)]">
                    <div className="flex aspect-[2/1] items-center justify-center overflow-hidden bg-slate-100">
                      {imageSource ? (
                        <img src={imageSource} alt={`${project.TITLE} 專案畫面`} className="h-full w-full scale-110 object-contain transition duration-500 group-hover:scale-[1.14]" onError={() => setFailedImageSources((current) => new Set(current).add(imageSource))} />
                      ) : (
                        <span className="font-bold text-slate-400">{project.TITLE}</span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-indigo-600">{project.CATEGORY || "Project"}</p>
                      <h3 className="mt-3 text-xl font-black tracking-tight text-slate-950">{project.TITLE}</h3>
                      <p className="mt-3 flex-1 line-clamp-3 leading-7 text-slate-600">{project.DESCRIPTION}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {(project.TECHNOLOGIES ?? []).slice(0, 4).map((technology) => (
                          <span key={technology} className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">{technology}</span>
                        ))}
                      </div>
                      {projectUrl && (
                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-indigo-700">查看專案 <span className="transition group-hover:translate-x-1" aria-hidden="true">↗</span></span>
                      )}
                    </div>
                  </article>
                );

                return (
                  <Reveal key={project.ID} delay={index * 80} className="h-full">
                    {projectUrl ? (
                      <a href={projectUrl} target="_blank" rel="noopener noreferrer" className="block h-full rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600">{content}</a>
                    ) : content}
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <div className="mt-12"><PageState kind="empty" title="精選作品整理中" description="更多專案內容即將上線。" /></div>
          )}

          <Reveal className="mt-10 text-center">
            <Link to="/projects" className="button-secondary group">瀏覽全部作品 <span className="transition group-hover:translate-x-1" aria-hidden="true">→</span></Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
