import { IconArrowUpRight, IconClock } from "@tabler/icons-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { DashboardData, StatusTone } from "./dashboard-data"

type Activity = DashboardData["activity"][number]

const iconTone: Record<StatusTone, string> = {
  blue: "bg-sky-50 text-sky-600",
  green: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  red: "bg-rose-50 text-rose-600",
  slate: "bg-slate-100 text-slate-600",
}

const ActivityRow = ({ item }: { item: Activity }) => {
  const Icon = item.icon

  return (
    <li className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
      <div className={`mt-0.5 rounded-lg p-2 ${iconTone[item.tone]}`}><Icon className="size-4" /></div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-900">{item.title}</p>
        <p className="mt-0.5 truncate text-xs text-slate-500">{item.description}</p>
      </div>
      <span className="shrink-0 text-[11px] text-slate-400">{item.time}</span>
    </li>
  )
}

const RecentActivity = ({ activity }: { activity: DashboardData["activity"] }) => (
  <Card className="bg-white shadow-sm ring-slate-200/80">
    <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
      <div>
        <CardTitle className="font-sans text-base font-semibold text-slate-950">Recent activity</CardTitle>
        <p className="mt-1 text-xs text-slate-500">Latest system events</p>
      </div>
      <IconClock className="size-4 text-slate-400" />
    </CardHeader>
    <CardContent className="p-5 sm:p-6">
      <ul className="divide-y divide-slate-100 dark:divide-slate-600/35">
        {activity.map((item) => <ActivityRow key={`${item.title}-${item.time}`} item={item} />)}
      </ul>
      <button type="button" className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-sky-700 hover:text-sky-800">View all activity <IconArrowUpRight className="size-3.5" /></button>
    </CardContent>
  </Card>
)

export default RecentActivity