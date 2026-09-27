import { IconDroplet, IconRefresh } from "@tabler/icons-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { DashboardData } from "./dashboard-data"

type TankData = DashboardData["tank"]

const WaterTankCard = ({ tank }: { tank: TankData }) => {
    const waterHeight = `${Math.max(8, tank.percentage)}%`

    return (
        <>
            <style>{`
                @keyframes water-wave-drift {
                    from { transform: translateX(-50%); }
                    to { transform: translateX(0); }
                }

                .water-wave-drift {
                    animation: water-wave-drift 4s linear infinite;
                    will-change: transform;
                }

                @media (prefers-reduced-motion: reduce) {
                    .water-wave-drift {
                        animation: none;
                        transform: translateX(-50%);
                    }
                }
            `}</style>
            <Card className="bg-white shadow-sm ring-slate-200/80">
                <CardHeader className="flex flex-row items-start justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                        <CardTitle className="font-sans text-base font-semibold text-slate-950">Water tank</CardTitle>
                        <p className="mt-1 text-xs text-slate-500">Current storage capacity</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700">
                        <IconRefresh className="size-3.5" /> {tank.lastUpdated}
                    </span>
                </CardHeader>
                <CardContent className="grid gap-6 p-5 sm:grid-cols-[minmax(140px,0.8fr)_1fr] sm:items-center sm:p-6">
                    <div className="mx-auto flex h-52 w-36 items-end overflow-hidden rounded-b-[2rem] rounded-t-xl border-4 border-slate-200 bg-slate-50 shadow-inner sm:h-60 sm:w-40">
                        <div className="relative w-full overflow-hidden bg-sky-500 transition-[height] duration-500 ease-out" style={{ height: waterHeight }}>
                            <svg
                                className="water-wave-drift pointer-events-none absolute -top-1 left-0 h-4 w-[200%] max-w-none"
                                viewBox="0 0 240 16"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                                focusable="false"
                            >
                                <path
                                    d="M0 8 C10 2 20 2 30 8 S50 14 60 8 S80 2 90 8 S110 14 120 8 V16 H0 Z"
                                    fill="rgb(125 211 252 / 0.7)"
                                />
                                <path
                                    d="M120 8 C130 2 140 2 150 8 S170 14 180 8 S200 2 210 8 S230 14 240 8 V16 H120 Z"
                                    fill="rgb(125 211 252 / 0.7)"
                                />
                            </svg>
                            <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center text-white">
                                <IconDroplet className="size-5" />
                                <span className="font-heading text-2xl font-semibold">{tank.percentage}%</span>
                            </div>
                        </div>
                    </div>
                <div className="space-y-5">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Available water</p>
                        <p className="mt-1 font-heading text-3xl font-semibold text-slate-950">{tank.liters} <span className="font-sans text-base font-medium text-slate-500">L</span></p>
                    </div>
                    <div>
                        <div className="mb-2 flex justify-between text-xs text-slate-500">
                            <span>Tank fill level</span>
                            <span>{tank.liters} / {tank.capacity} L</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                            <div className="h-full rounded-full bg-sky-500" style={{ width: `${tank.percentage}%` }} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                        <div>
                            <p className="text-xs text-slate-500">Capacity</p>
                            <p className="mt-1 text-sm font-semibold text-slate-900">{tank.capacity} L</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Status</p>
                            <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600"><span className="size-1.5 rounded-full bg-emerald-500" /> Healthy</p>
                        </div>
                    </div>
                </div>
                </CardContent>
            </Card>
        </>
    )
}

export default WaterTankCard