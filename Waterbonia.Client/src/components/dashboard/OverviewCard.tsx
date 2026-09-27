import { Card, CardContent } from "@/components/ui/card"
import type { OverviewMetric, StatusTone } from "./dashboard-data"

const toneClasses: Record<StatusTone, string> = {
  blue: "bg-sky-50 text-sky-600 ring-sky-100",
  green: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  amber: "bg-amber-50 text-amber-600 ring-amber-100",
  red: "bg-rose-50 text-rose-600 ring-rose-100",
  slate: "bg-slate-100 text-slate-600 ring-slate-200",
}

const OverviewCard = ({ metric }: { metric: OverviewMetric }) => {
  const Icon = metric.icon

  return (
    <Card className="min-w-0 bg-white shadow-sm ring-slate-200/80">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className={`rounded-lg p-2 ring-1 ${toneClasses[metric.tone]}`}>
            <Icon className="size-4" />
          </div>
          <span className="rounded-full bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-500">
            {metric.status}
          </span>
        </div>
        <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500">{metric.label}</p>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="font-heading text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{metric.value}</span>
          {metric.unit && <span className="text-sm font-medium text-slate-500">{metric.unit}</span>}
        </div>
        <p className="mt-2 truncate text-xs text-slate-500">{metric.detail}</p>
      </CardContent>
    </Card>
  )
}

export default OverviewCard