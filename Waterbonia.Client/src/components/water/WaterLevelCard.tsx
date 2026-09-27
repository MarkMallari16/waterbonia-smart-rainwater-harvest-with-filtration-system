import { IconDroplet, IconGauge } from "@tabler/icons-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import WaterTank from "./WaterTank"
import type { WaterLevelStatus } from "@/types/water"

interface WaterLevelCardProps {
    percentage: number
    currentVolume: number
    capacity: number
    status: WaterLevelStatus
}

const WaterLevelCard = ({ percentage, currentVolume, capacity, status }: WaterLevelCardProps) => (
    <Card className="bg-white shadow-sm ring-slate-200/80">
        <CardHeader className="border-b border-slate-100 pb-4">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <CardTitle className="font-sans text-base font-semibold text-slate-950">Current Water Level</CardTitle>
                    <p className="mt-1 text-xs text-slate-500">Live storage in your rainwater tank</p>
                </div>
                <span className="rounded-lg bg-sky-50 p-2 text-sky-600"><IconGauge className="size-4" /></span>
            </div>
        </CardHeader>
        <CardContent className="grid gap-6 p-5 sm:grid-cols-[minmax(150px,0.8fr)_1fr] sm:items-center sm:p-6">
            <WaterTank percentage={percentage} />
            <div className="space-y-5">
                <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Available water</p>
                    <p className="mt-1 font-heading text-3xl font-semibold text-slate-950">{currentVolume} <span className="font-sans text-base font-medium text-slate-500">L</span></p>
                    <p className="mt-1 text-xs text-slate-500">{currentVolume} L / {capacity} L</p>
                </div>
                <div>
                    <div className="mb-2 flex justify-between text-xs text-slate-500"><span>Tank fill level</span><span>{percentage}%</span></div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-sky-500 transition-[width] duration-700" style={{ width: `${percentage}%` }} /></div>
                </div>
                <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                    <div><p className="text-xs text-slate-500">Tank status</p><p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600"><span className="size-1.5 rounded-full bg-emerald-500" />{status}</p></div>
                    <div><p className="text-xs text-slate-500">Capacity</p><p className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-slate-900"><IconDroplet className="size-3.5 text-sky-500" />{capacity} L</p></div>
                </div>
            </div>
        </CardContent>
    </Card>
)

export default WaterLevelCard
