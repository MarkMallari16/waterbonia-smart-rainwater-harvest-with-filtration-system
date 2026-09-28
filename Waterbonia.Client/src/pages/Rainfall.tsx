import { useState } from "react"
import {
    Activity,
    CalendarDays,
    CheckCircle2,
    CloudRain,
    Clock3,
    Database,
    Droplets,
    Gauge,
    Radio,
    Wifi,
} from "lucide-react"
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ChartContainer } from "@/components/ui/chart"
import Header from "@/components/layout/Header"

type ChartRange = "Today" | "7 Days" | "30 Days"
type HistoryPoint = { label: string; rainfall: number }

const chartData: Record<ChartRange, HistoryPoint[]> = {
    Today: [
        { label: "6 AM", rainfall: 1.2 },
        { label: "9 AM", rainfall: 4.8 },
        { label: "12 PM", rainfall: 8.2 },
        { label: "3 PM", rainfall: 3.5 },
        { label: "6 PM", rainfall: 12.4 },
        { label: "9 PM", rainfall: 2.1 },
    ],
    "7 Days": [
        { label: "Mon", rainfall: 8.4 },
        { label: "Tue", rainfall: 14.2 },
        { label: "Wed", rainfall: 4.8 },
        { label: "Thu", rainfall: 21.6 },
        { label: "Fri", rainfall: 9.5 },
        { label: "Sat", rainfall: 16.3 },
        { label: "Sun", rainfall: 11.6 },
    ],
    "30 Days": [
        { label: "Week 1", rainfall: 32.4 },
        { label: "Week 2", rainfall: 48.7 },
        { label: "Week 3", rainfall: 26.8 },
        { label: "Week 4", rainfall: 34.8 },
    ],
}

const chartConfig = {
    rainfall: { label: "Rainfall", color: "#0ea5e9" },
}

const recentEvents = [
    { time: "6:00 PM", rainfall: "8.2 mm", intensity: "Moderate" },
    { time: "4:30 PM", rainfall: "3.5 mm", intensity: "Light" },
    { time: "2:15 PM", rainfall: "10.1 mm", intensity: "Heavy" },
    { time: "11:40 AM", rainfall: "1.2 mm", intensity: "Light" },
]

const summaryStats: { icon: typeof CalendarDays; label: string; value: string; detail: string }[] = [
    { icon: CalendarDays, label: "Today", value: "24.8 mm", detail: "+8.2 mm from yesterday" },
    { icon: Droplets, label: "This Week", value: "86.4 mm", detail: "Healthy collection trend" },
    { icon: Database, label: "This Month", value: "142.7 mm", detail: "12% above average" },
    { icon: CloudRain, label: "Rainy Days", value: "8 days", detail: "This month" },
]

const intensityWidth = "62%"

const EmptyRainfallState = () => (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/60 p-6 text-center">
        <CloudRain className="mb-3 size-8 text-slate-300" />
        <h2 className="font-semibold text-slate-800">No rainfall data available</h2>
        <p className="mt-1 max-w-xs text-sm leading-6 text-slate-500">Rainfall readings will appear here when your rain sensor detects rainfall.</p>
        <Button type="button" variant="outline" className="mt-4">Refresh</Button>
    </div>
)

const Rainfall = () => {
    const [range, setRange] = useState<ChartRange>("Today")

    return (
        <div className="min-h-screen bg-slate-50/70 text-slate-950">
            <Header />
            <main className="mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-600">Weather overview</p>
                        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">Rainfall Monitoring</h1>
                        <p className="mt-2 text-sm text-slate-500">Monitor rainfall conditions and collection activity.</p>
                    </div>
                    <p className="flex items-center gap-1.5 text-xs text-slate-400"><Clock3 className="size-3.5" /> Updated just now</p>
                </div>

                <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
                    <Card className="overflow-hidden border-sky-100 bg-white shadow-sm ring-slate-200/80">
                        <CardContent className="relative flex min-h-72 flex-col items-center justify-center p-6 text-center sm:min-h-80">
                            <div className="absolute right-6 top-6 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">Current conditions</div>
                            <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-sky-50 text-sky-500 ring-8 ring-sky-50/60">
                                <CloudRain className="size-10" strokeWidth={1.6} />
                            </div>
                            <p className="font-heading text-5xl font-semibold tracking-tight text-slate-950">12.4 <span className="text-xl font-medium text-slate-500">mm</span></p>
                            <p className="mt-2 text-lg font-semibold text-slate-800">Moderate Rain</p>
                            <p className="mt-2 text-xs text-slate-400">Updated just now</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-sm ring-slate-200/80">
                        <CardHeader className="border-b border-slate-100 pb-4"><CardTitle className="text-base">Rain Status</CardTitle></CardHeader>
                        <CardContent className="space-y-5 p-5 sm:p-6">
                            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700"><span className="size-2 rounded-full bg-emerald-500" /> Raining</div>
                            <div className="grid gap-4">
                                <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2 text-sm text-slate-500"><Radio className="size-4 text-sky-500" /> Rain Sensor</div><span className="text-sm font-semibold text-slate-800">Connected</span></div>
                                <Separator />
                                <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2 text-sm text-slate-500"><Activity className="size-4 text-sky-500" /> Rainfall Intensity</div><span className="text-sm font-semibold text-slate-800">Moderate</span></div>
                            </div>
                            <div className="rounded-lg bg-sky-50/70 p-4 text-sm leading-6 text-sky-900"><p className="font-medium">Collection conditions are favorable.</p><p className="text-xs text-sky-700">Rain is contributing to your tank level.</p></div>
                        </CardContent>
                    </Card>
                </section>

                <section className="mt-6">
                    <Card className="bg-white shadow-sm ring-slate-200/80">
                        <CardHeader className="flex flex-col gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
                            <div><CardTitle className="text-base">Rainfall History</CardTitle><p className="mt-1 text-xs text-slate-500">Rainfall measured throughout the selected period</p></div>
                            <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1" role="group" aria-label="Rainfall history range">
                                {(Object.keys(chartData) as ChartRange[]).map((option) => <Button key={option} type="button" variant={range === option ? "default" : "ghost"} size="sm" onClick={() => setRange(option)} className={range === option ? "bg-sky-500 text-white hover:bg-sky-600" : "text-slate-500"}>{option}</Button>)}
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6">
                            {chartData[range].length === 0 ? <EmptyRainfallState /> : <ChartContainer config={chartConfig} className="h-72 w-full aspect-auto">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData[range]} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                                        <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="4 4" />
                                        <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={(value) => `${value}`} />
                                        <Tooltip cursor={{ fill: "#f0f9ff" }} contentStyle={{ border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12 }} formatter={(value) => [`${value} mm`, "Rainfall"]} />
                                        <Bar dataKey="rainfall" fill="var(--color-rainfall)" radius={[5, 5, 0, 0]} maxBarSize={42} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>}
                        </CardContent>
                    </Card>
                </section>

                <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {summaryStats.map(({ icon: StatIcon, label, value, detail }) => {
                        return <Card key={label} className="bg-white shadow-sm ring-slate-200/80"><CardContent className="p-5"><div className="mb-4 flex items-center justify-between"><span className="rounded-lg bg-sky-50 p-2 text-sky-600"><StatIcon className="size-4" /></span><span className="text-xs text-emerald-600">{detail}</span></div><p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p><p className="mt-1 font-heading text-2xl font-semibold tracking-tight text-slate-950">{value}</p></CardContent></Card>
                    })}
                </section>

                <section className="mt-6 grid gap-6 lg:grid-cols-2">
                    <Card className="bg-white shadow-sm ring-slate-200/80"><CardHeader><CardTitle className="flex items-center gap-2 text-base"><Gauge className="size-4 text-sky-500" /> Rainfall Intensity</CardTitle></CardHeader><CardContent className="space-y-4 p-5 pt-0 sm:p-6 sm:pt-0"><div className="flex justify-between text-xs text-slate-500"><span>Low</span><span>High</span></div><div className="relative h-3 rounded-full bg-slate-100"><div className="h-full rounded-full bg-sky-500" style={{ width: intensityWidth }} /><span className="absolute top-1/2 size-5 -translate-y-1/2 rounded-full border-4 border-white bg-sky-600 shadow-sm" style={{ left: `calc(${intensityWidth} - 10px)` }} /></div><div className="flex items-end justify-between"><div><p className="font-semibold text-slate-900">Moderate Rain</p><p className="mt-1 text-xs text-slate-500">Current intensity</p></div><p className="font-heading text-xl font-semibold text-sky-600">12.4 <span className="font-sans text-sm font-medium text-slate-500">mm/hr</span></p></div></CardContent></Card>
                    <Card className="bg-white shadow-sm ring-slate-200/80"><CardHeader><CardTitle className="flex items-center gap-2 text-base"><Droplets className="size-4 text-sky-500" /> Collection Impact</CardTitle></CardHeader><CardContent className="p-5 pt-0 sm:p-6 sm:pt-0"><div className="grid grid-cols-3 gap-3"><div><p className="text-xs text-slate-500">Rainfall</p><p className="mt-1 text-lg font-semibold">12.4 <span className="text-xs font-medium text-slate-500">mm</span></p></div><div><p className="text-xs text-slate-500">Estimated Collection</p><p className="mt-1 text-lg font-semibold">18.6 <span className="text-xs font-medium text-slate-500">L</span></p></div><div><p className="text-xs text-slate-500">Tank Increase</p><p className="mt-1 text-lg font-semibold text-emerald-600">+6%</p></div></div><p className="mt-5 text-xs leading-5 text-slate-500">Rainfall contributes to the water collected by your system.</p></CardContent></Card>
                </section>

                <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
                    <Card className="bg-white shadow-sm ring-slate-200/80"><CardHeader className="flex flex-row items-center justify-between"><CardTitle className="text-base">Rain Sensor</CardTitle><CheckCircle2 className="size-5 text-emerald-500" /></CardHeader><CardContent className="space-y-4 p-5 pt-0 sm:p-6 sm:pt-0"><div className="flex items-center gap-2 text-sm font-semibold text-emerald-700"><span className="size-2 rounded-full bg-emerald-500" /> Online</div><div className="grid gap-3 text-sm"><div className="flex justify-between"><span className="text-slate-500">Sensor Status</span><span className="font-medium">Connected</span></div><div className="flex justify-between"><span className="text-slate-500">Last Reading</span><span className="font-medium">12.4 mm</span></div><div className="flex items-center justify-between"><span className="flex items-center gap-2 text-slate-500"><Wifi className="size-3.5" /> Last Updated</span><span className="font-medium">Just now</span></div></div></CardContent></Card>
                    <Card className="bg-white shadow-sm ring-slate-200/80"><CardHeader><CardTitle className="text-base">Recent Rainfall Events</CardTitle></CardHeader><CardContent className="p-0"><div className="hidden grid-cols-3 border-y border-slate-100 px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate-400 sm:grid"><span>Time</span><span>Rainfall</span><span>Intensity</span></div>{recentEvents.map((event) => <div key={event.time} className="grid gap-1 border-b border-slate-100 px-5 py-3 last:border-0 sm:grid-cols-3 sm:gap-0"><span className="text-sm font-medium text-slate-800">{event.time}</span><span className="text-sm text-slate-600">{event.rainfall}</span><span className="text-xs text-sky-700">{event.intensity}</span></div>)}</CardContent></Card>
                </section>
            </main>
        </div>
    )
}

export default Rainfall
