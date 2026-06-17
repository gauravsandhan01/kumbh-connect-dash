import { cn } from "@/lib/utils";

export function KumbhLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-saffron shadow-soft">
        <svg viewBox="0 0 32 32" className="h-6 w-6 text-white" fill="none">
          {/* Kalash silhouette */}
          <path d="M16 3l2.2 3.2L16 8l-2.2-1.8L16 3z" fill="currentColor" />
          <path d="M11 9h10v2H11z" fill="currentColor" opacity="0.85" />
          <path
            d="M10 12c0 5 2 8 6 8s6-3 6-8H10z"
            fill="currentColor"
          />
          <path d="M8 22h16v2H8z" fill="currentColor" opacity="0.9" />
          <path
            d="M6 26c2-1 4-1 5 0s3 1 5 0 3-1 5 0 3 1 5 0v3H6v-3z"
            fill="currentColor"
            opacity="0.7"
          />
        </svg>
      </div>
      <div className="leading-tight">
        <div className="font-display text-base font-bold text-foreground">Kumbh Vendor</div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Maha Kumbh Mela
        </div>
      </div>
    </div>
  );
}