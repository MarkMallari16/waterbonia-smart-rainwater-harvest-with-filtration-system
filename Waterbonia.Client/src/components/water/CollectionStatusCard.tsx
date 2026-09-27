import { IconArrowsDown, IconPlayerPause, IconPlayerStop, IconRosette } from "@tabler/icons-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CollectionState } from "@/types/water"

interface CollectionStatusCardProps { state: CollectionState }

const stateConfig: Record<CollectionState, { icon: typeof IconArrowsDown; className: string; description: string }> = {
    Collecting: { icon: IconArrowsDown, className: "bg-emerald-50 text-emerald-700", description: "Rain detected. Water is currently flowing into the tank." },
    Standby: { icon: IconPlayerPause, className: "bg-slate-100 text-slate-600", description: "No rain detected. Collection is waiting." },
    "Tank Full": { icon: IconRosette, className: "bg-amber-50 text-amber-700", description: "The tank is full. Collection should stop to prevent overflow." },
    Disabled: { icon: IconPlayerStop, className: "bg-rose-50 text-rose-700", description: "Collection has been disabled by the system." },
}

const CollectionStatusCard = ({ state }: CollectionStatusCardProps) => { const config = stateConfig[state]; const Icon = config.icon; return <Card className="bg-white shadow-sm ring-slate-200/80"><CardHeader className="border-b border-slate-100 pb-4"><CardTitle className="font-sans text-base font-semibold text-slate-950">Collection Status</CardTitle></CardHeader><CardContent className="p-5 sm:p-6"><div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${config.className}`}><Icon className="size-3.5" />{state}</div><p className="mt-4 text-sm leading-6 text-slate-500">{config.description}</p></CardContent></Card> }

export default CollectionStatusCard
