import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-white/70">
      <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-sky-200/35 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-violet-200/35 blur-3xl" />
      <div className="section-shell relative !max-w-6xl !py-14 sm:!py-20">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        </Reveal>
      </div>
    </section>
  );
}
