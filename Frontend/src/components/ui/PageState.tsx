interface PageStateProps {
  kind: "loading" | "error" | "empty";
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export default function PageState({ kind, title, description, onRetry }: PageStateProps) {
  if (kind === "loading") {
    return (
      <div className="flex min-h-72 items-center justify-center" role="status">
        <span className="h-11 w-11 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
        <span className="sr-only">載入中</span>
      </div>
    );
  }

  return (
    <div className={`rounded-3xl border px-6 py-14 text-center ${kind === "error" ? "border-rose-200 bg-rose-50/80" : "border-dashed border-slate-300 bg-white/70"}`}>
      <h2 className="text-lg font-bold text-slate-950">{title}</h2>
      {description && <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>}
      {onRetry && (
        <button type="button" onClick={onRetry} className="button-primary mt-6">
          重新載入
        </button>
      )}
    </div>
  );
}
