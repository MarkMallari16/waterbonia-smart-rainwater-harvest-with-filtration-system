import { IconFlask, IconInfoCircle } from "@tabler/icons-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WaterQualityStatus } from "@/types/water"

interface WaterQualityCardProps {
    status: WaterQualityStatus
    turbidity: number | null
}

const qualityStyles: Record<WaterQualityStatus, string> = {
    Good: "bg-emerald-50 text-emerald-700",
    Warning: "bg-amber-50 text-amber-700",
    Poor: "bg-rose-50 text-rose-700",
}

const WaterQualityCard = ({ status, turbidity }: WaterQualityCardProps) => (
    <Card className="bg-white shadow-sm ring-slate-200/80">
        <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-slate-100 pb-4">
            <div><CardTitle className="font-sans text-base font-semibold text-slate-950">Water Quality</CardTitle><p className="mt-1 text-xs text-slate-500">A turbidity-based monitoring signal</p></div>
            <span className="rounded-lg bg-sky-50 p-2 text-sky-600"><IconFlask className="size-4" /></span>
        </CardHeader>
        <CardContent className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4"><div><p className="text-xs uppercase tracking-wide text-slate-500">Current reading</p><p className="mt-1 font-heading text-3xl font-semibold text-slate-950">{turbidity ?? "--"} <span className="font-sans text-base font-medium text-slate-500">NTU</span></p></div><span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${qualityStyles[status]}`}><span className="mr-1.5">●</span>{status}</span></div>
            <div className="mt-6 flex gap-2 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-500"><IconInfoCircle className="mt-0.5 size-4 shrink-0 text-sky-500" /><p>Water quality is estimated using the turbidity sensor. This reading does not indicate drinking-water safety.</p></div>
        </CardContent>
    </Card>
)

export default WaterQualityCard
