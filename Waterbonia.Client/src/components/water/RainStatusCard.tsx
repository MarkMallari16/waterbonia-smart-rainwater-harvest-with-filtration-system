import { IconCloudRain, IconRadar } from "@tabler/icons-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SensorConnectionStatus } from "@/types/water"

interface RainStatusCardProps { detected: boolean; durationMinutes: number; sensorStatus: SensorConnectionStatus }

const RainStatusCard = ({ detected, durationMinutes, sensorStatus }: RainStatusCardProps) => (
    <Card className="bg-white shadow-sm ring-slate-200/80">
        <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-slate-100 pb-4"><div><CardTitle className="font-sans text-base font-semibold text-slate-950">Rain Detection</CardTitle><p className="mt-1 text-xs text-slate-500">Live reading from the rain sensor</p></div><span className="rounded-lg bg-sky-50 p-2 text-sky-600"><IconCloudRain className="size-4" /></span></CardHeader>
        <CardContent className="space-y-5 p-5 sm:p-6"><div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${detected ? "bg-sky-50 text-sky-700" : "bg-slate-100 text-slate-600"}`}><span className={`size-1.5 rounded-full ${detected ? "bg-sky-500" : "bg-slate-400"}`} />{detected ? "Rain Detected" : "No Rain Detected"}</div><div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4"><div><p className="text-xs text-slate-500">Rain duration</p><p className="mt-1 text-lg font-semibold text-slate-900">{detected ? `${durationMinutes} min` : "--"}</p></div><div><p className="text-xs text-slate-500">Sensor</p><p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900"><IconRadar className="size-3.5 text-sky-500" />{sensorStatus}</p></div></div></CardContent>
    </Card>
)

export default RainStatusCard
