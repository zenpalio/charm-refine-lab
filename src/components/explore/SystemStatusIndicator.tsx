import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type ServiceStatus = "operational" | "degraded" | "down";

type Service = {
  name: string;
  status: ServiceStatus;
  note?: string;
};

// Mock data — replace with real status feed
const services: Service[] = [
  { name: "Chat", status: "operational" },
  { name: "Image generation", status: "operational" },
  { name: "Video generation", status: "degraded", note: "Slower than usual" },
  { name: "Voice", status: "operational" },
  { name: "Payments", status: "operational" },
];

const statusColor: Record<ServiceStatus, string> = {
  operational: "bg-emerald-500",
  degraded: "bg-amber-500",
  down: "bg-rose-500",
};

const statusLabel: Record<ServiceStatus, string> = {
  operational: "Operational",
  degraded: "Degraded",
  down: "Down",
};

function overallStatus(list: Service[]): ServiceStatus {
  if (list.some((s) => s.status === "down")) return "down";
  if (list.some((s) => s.status === "degraded")) return "degraded";
  return "operational";
}

export default function SystemStatusIndicator() {
  const [open, setOpen] = useState(false);
  const overall = overallStatus(services);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="pointer-events-auto relative flex h-9 w-9 items-center justify-center text-foreground/90 transition-opacity hover:opacity-70"
          aria-label={`System status: ${statusLabel[overall]}`}
        >
          <span className="relative flex h-2 w-2">
            {overall !== "operational" && (
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${statusColor[overall]}`}
              />
            )}
            <span className={`relative inline-flex h-2 w-2 rounded-full ${statusColor[overall]}`} />
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-64 rounded-2xl border border-border/60 bg-background/95 p-3 backdrop-blur-xl"
      >
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            System status
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-foreground/80">
            <span className={`h-1.5 w-1.5 rounded-full ${statusColor[overall]}`} />
            {statusLabel[overall]}
          </span>
        </div>
        <ul className="flex flex-col">
          {services.map((s) => (
            <li
              key={s.name}
              className="flex items-center justify-between gap-3 rounded-lg px-1 py-1.5"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${statusColor[s.status]}`} />
                <span className="truncate text-sm text-foreground/90">{s.name}</span>
              </div>
              <span className="shrink-0 text-[11px] text-muted-foreground">
                {s.note ?? statusLabel[s.status]}
              </span>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
