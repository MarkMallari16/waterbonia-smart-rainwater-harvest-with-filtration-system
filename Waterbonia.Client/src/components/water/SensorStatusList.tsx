import { IconCpu, IconDroplet, IconFlask, IconCloudRain } from "@tabler/icons-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SensorConnectionStatus, SensorReading } from "@/types/water"

interface SensorStatusListProps { sensors: SensorReading[] }
const icons = { "Water Level": IconDroplet, Turbidity: IconFlask, "Rain Sensor": IconCloudRain, ESP32: IconCpu }

const SensorStatusList = ({ sensors }: SensorStatusListProps) => <Card className="bg-white shadow-sm ring-slate-200/80"><CardHeader className="border-b border-slate-100 pb-4"><CardTitle className="font-sans text-base font-semibold text-slate-950">Sensor Overview</CardTitle></CardHeader><CardContent className="p-0"><div className="hidden grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr] gap-3 border-b border-slate-100 px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400 sm:grid"><span>Sensor</span><span>Status</span><span>Reading</span><span>Updated</span></div>{sensors.map((sensor) => { const Icon = icons[sensor.name as keyof typeof icons]; const online: SensorConnectionStatus = sensor.status; return <div key={sensor.name} className="grid gap-2 border-b border-slate-100 px-5 py-4 last:border-0 sm:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr] sm:items-center sm:gap-3"><div className="flex items-center gap-2.5"><span className="rounded-md bg-sky-50 p-1.5 text-sky-600"><Icon className="size-3.5" /></span><span className="text-sm font-medium text-slate-800">{sensor.name}</span></div><span className={`inline-flex items-center gap-1.5 text-xs font-medium ${online === "Online" ? "text-emerald-600" : "text-rose-600"}`}><span className={`size-1.5 rounded-full ${online === "Online" ? "bg-emerald-500" : "bg-rose-500"}`} />{online}</span><span className="text-xs text-slate-500 sm:text-sm">{sensor.reading ?? "--"}</span><span className="text-xs text-slate-400">{sensor.lastUpdated}</span></div> })}</CardContent></Card>

export default SensorStatusList
