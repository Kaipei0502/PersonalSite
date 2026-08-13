interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeading({ eyebrow, title, description, centered = false }: SectionHeadingProps) {
  return (
    <header className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        <span className="h-px w-9 bg-gradient-to-r from-sky-500 to-violet-500" />
        <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-indigo-600 sm:text-sm">
          {eyebrow}
        </p>
      </div>
      <h2 className="mt-5 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">{description}</p>}
    </header>
  );
}
