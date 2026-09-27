import { IconCloudRain, IconRadar } from "@tabler/icons-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { DashboardData } from "./dashboard-data"

type RainData = DashboardData["rain"]

const RainMonitoring = ({ rain }: { rain: RainData }) => (
  <Card className="bg-white shadow-sm ring-slate-200/80">
    <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-slate-100 pb-4">
      <div>
        <CardTitle className="font-sans text-base font-semibold text-slate-950">Rain monitoring</CardTitle>
        <p className="mt-1 text-xs text-slate-500">Rainfall activity today</p>
      </div>
      <div className="rounded-lg bg-sky-50 p-2 text-sky-600"><IconCloudRain className="size-4" /></div>
    </CardHeader>
    <CardContent className="min-w-0 p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"><span className="size-1.5 rounded-full bg-emerald-500" />{rain.status}</span>
        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500"><IconRadar className="size-3.5" /> Sensor {rain.sensorState.toLowerCase()}</span>
      </div>
      <div className="mt-5 h-44 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
          <AreaChart data={rain.activity} margin={{ top: 8, right: 4, left: -28, bottom: 0 }}>
            <defs>
              <linearGradient id="rain-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} />
            <Tooltip contentStyle={{ border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12 }} formatter={(value) => [`${value} mm`, "Rainfall"]} />
            <Area type="monotone" dataKey="amount" stroke="#0284c7" strokeWidth={2} fill="url(#rain-fill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-xs text-slate-500">Last detected {rain.lastDetected}</p>
    </CardContent>
  </Card>
)

export default RainMonitoring