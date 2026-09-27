import { IconDroplet } from "@tabler/icons-react"

interface WaterTankProps {
    percentage: number
}

const WaterTank = ({ percentage }: WaterTankProps) => {
    const waterHeight = `${Math.max(8, Math.min(100, percentage))}%`

    return (
        <div className="water-tank relative mx-auto flex h-64 w-40 items-end overflow-hidden rounded-b-[2rem] rounded-t-2xl border-4 border-slate-200 bg-slate-50 shadow-inner sm:h-72 sm:w-44" aria-label={`Tank is ${percentage}% full`}>
            <style>{`@keyframes waterbonia-wave { from { transform: translateX(-50%); } to { transform: translateX(0); } } .waterbonia-wave { animation: waterbonia-wave 4s linear infinite; } @media (prefers-reduced-motion: reduce) { .waterbonia-wave { animation: none; } }`}</style>
            <div className="relative w-full bg-sky-500 transition-[height] duration-700 ease-out" style={{ height: waterHeight }}>
                <svg className="waterbonia-wave pointer-events-none absolute -top-1 left-0 h-4 w-[200%] max-w-none" viewBox="0 0 240 16" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 8 C10 2 20 2 30 8 S50 14 60 8 S80 2 90 8 S110 14 120 8 V16 H0 Z" fill="rgb(186 230 253 / 0.8)" />
                    <path d="M120 8 C130 2 140 2 150 8 S170 14 180 8 S200 2 210 8 S230 14 240 8 V16 H120 Z" fill="rgb(186 230 253 / 0.8)" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <IconDroplet className="size-5" />
                    <span className="font-heading text-3xl font-semibold">{percentage}%</span>
                </div>
            </div>
        </div>
    )
}

export default WaterTank
