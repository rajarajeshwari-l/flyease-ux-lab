import { PlaneTakeoff, SearchX, AlertTriangle } from "lucide-react";

export function LoadingSkeleton({ rows = 4 }) {
  return (
    <div className="space-y-4" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading results…</span>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="card animate-pulse p-5">
          <div className="h-4 w-1/3 rounded bg-neutral-100" />
          <div className="mt-4 h-8 w-2/3 rounded bg-neutral-100" />
          <div className="mt-4 h-3 w-1/2 rounded bg-neutral-100" />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ icon: Icon = SearchX, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-white px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-50">
        <Icon className="h-7 w-7 text-neutral-400" />
      </div>
      <h3 className="text-base font-semibold text-navy-900">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm text-neutral-500">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({ title = "Something went wrong", description }) {
  return (
    <div className="alert-danger" role="alert">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
      <div>
        <p className="font-semibold">{title}</p>
        {description && <p className="mt-0.5">{description}</p>}
      </div>
    </div>
  );
}

export function PageLoader({ label = "Loading FlyEase…" }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-neutral-400">
      <PlaneTakeoff className="h-8 w-8 animate-pulse text-cyan-500" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
