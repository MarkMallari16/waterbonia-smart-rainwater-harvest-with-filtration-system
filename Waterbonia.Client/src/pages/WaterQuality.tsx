import { useState } from "react"
import {
    CheckCircle2,
    CircleAlert,
    Clock,
    Database,
    Droplets,
    Eye,
    Filter,
    Gauge,
    RefreshCw,
    Wifi,
    type LucideIcon,
} from "lucide-react"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"
import Header from "@/components/layout/Header"

type HistoryRange = "Today" | "7 Days" | "30 Days"
type HistoryPoint = { label: string; turbidity: number }
type QualityTone = "good" | "warning" | "poor"

const historyData: Record<HistoryRange, HistoryPoint[]> = {
    Today: [
        { label: "6 AM", turbidity: 16 },
        { label: "9 AM", turbidity: 21 },
        { label: "12 PM", turbidity: 18 },
        { label: "3 PM", turbidity: 27 },
        { label: "6 PM", turbidity: 18 },
        { label: "9 PM", turbidity: 20 },
    ],
    "7 Days": [
        { label: "Mon", turbidity: 16 },
        { label: "Tue", turbidity: 22 },
        { label: "Wed", turbidity: 19 },
        { label: "Thu", turbidity: 31 },
        { label: "Fri", turbidity: 24 },
        { label: "Sat", turbidity: 18 },
        { label: "Sun", turbidity: 20 },
    ],
    "30 Days": [
        { label: "Week 1", turbidity: 24 },
        { label: "Week 2", turbidity: 18 },
        { label: "Week 3", turbidity: 29 },
        { label: "Week 4", turbidity: 21 },
    ],
}

const chartConfig = { turbidity: { label: "Turbidity", color: "#0ea5e9" } }
const statusClasses: Record<QualityTone, string> = {
    good: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
    poor: "bg-rose-50 text-rose-700",
}
const statusDots: Record<QualityTone, string> = {
    good: "bg-emerald-500",
    warning: "bg-amber-500",
    poor: "bg-rose-500",
}
const recentReadings = [
    { time: "6:00 PM", turbidity: "18 NTU", status: "Good", tone: "good" as QualityTone },
    { time: "4:30 PM", turbidity: "22 NTU", status: "Good", tone: "good" as QualityTone },
    { time: "2:15 PM", turbidity: "31 NTU", status: "Warning", tone: "warning" as QualityTone },
    { time: "11:40 AM", turbidity: "16 NTU", status: "Good", tone: "good" as QualityTone },
]
const summaryMetrics: { icon: LucideIcon; label: string; value: string; detail: string }[] = [
    { icon: Gauge, label: "Turbidity", value: "18 NTU", detail: "Normal" },
    { icon: Droplets, label: "Water Level", value: "72%", detail: "Normal" },
    { icon: Clock, label: "Last Reading", value: "2 min ago", detail: "Updated" },
]

const EmptyQualityState = () => (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/60 p-6 text-center">
        <Database className="size-8 text-slate-300" />
        <h2 className="mt-4 font-semibold text-slate-800">No water quality data available</h2>
        <p className="mt-1 max-w-xs text-sm leading-6 text-slate-500">Sensor readings will appear here when data becomes available.</p>
        <Button type="button" variant="outline" className="mt-4"><RefreshCw className="size-4" /> Refresh</Button>
    </div>
)

const WaterQuality = () => {
    const [range, setRange] = useState<HistoryRange>("Today")

    return (
        <div className="min-h-screen bg-slate-50/70 text-slate-950">
            <Header />
            <main className="mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-600">Quality overview</p>
                        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">Water Quality</h1>
                        <p className="mt-2 text-sm text-slate-500">Monitor the condition of your collected rainwater.</p>
                    </div>
                    <p className="flex items-center gap-1.5 text-xs text-slate-400"><Clock className="size-3.5" /> Updated just now</p>
                </div>

                <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
                    <Card className="overflow-hidden border-emerald-100 bg-white shadow-sm ring-slate-200/80">
                        <CardContent className="relative flex min-h-72 flex-col items-center justify-center p-6 text-center sm:min-h-80">
                            <div className="absolute right-6 top-6 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">Current condition</div>
                            <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 ring-8 ring-emerald-50/60"><Droplets className="size-10" strokeWidth={1.6} /></div>
                            <div className="flex items-center gap-2 text-xl font-semibold"><span className="size-2.5 rounded-full bg-emerald-500" /> GOOD</div>
                            <p className="mt-2 text-sm text-slate-500">Water condition is normal</p>
                            <p className="mt-2 text-xs text-slate-400">Updated just now</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white shadow-sm ring-slate-200/80">
                        <CardHeader><CardTitle className="text-base">Turbidity</CardTitle></CardHeader>
                        <CardContent className="space-y-5 p-5 pt-0 sm:p-6 sm:pt-0">
                            <div className="flex items-end justify-between"><p className="font-heading text-4xl font-semibold tracking-tight">18 <span className="text-base font-medium text-slate-500">NTU</span></p><span className="flex items-center gap-2 text-sm font-medium text-emerald-700"><span className="size-2 rounded-full bg-emerald-500" /> Normal</span></div>
                            <div><div className="flex justify-between text-xs text-slate-500"><span>Low</span><span>High</span></div><div className="relative mt-2 h-3 rounded-full bg-slate-100"><div className="h-full w-[45%] rounded-full bg-sky-500" /><span className="absolute left-[calc(45%-10px)] top-1/2 size-5 -translate-y-1/2 rounded-full border-4 border-white bg-sky-600 shadow-sm" /></div><p className="mt-2 text-center text-xs text-slate-500">18 NTU</p></div>
                            <p className="text-xs leading-5 text-slate-500">Lower turbidity generally indicates clearer water.</p>
                        </CardContent>
                    </Card>
                </section>

                <section className="mt-6 grid gap-6 lg:grid-cols-2">
                    <Card className="bg-white shadow-sm ring-slate-200/80"><CardHeader><CardTitle className="text-base">Water Condition</CardTitle></CardHeader><CardContent className="grid gap-4 p-5 pt-0 sm:p-6 sm:pt-0"><QualityRow icon={Eye} label="Appearance" value="Clear" tone="good" /><Separator /><QualityRow icon={Gauge} label="Turbidity" value="18 NTU" tone="good" /><Separator /><QualityRow icon={CheckCircle2} label="Condition" value="Normal" tone="good" /></CardContent></Card>
                    <Card className="bg-white shadow-sm ring-slate-200/80"><CardHeader><CardTitle className="text-base">Filtration Status</CardTitle></CardHeader><CardContent className="space-y-4 p-5 pt-0 sm:p-6 sm:pt-0"><div className="flex items-center gap-2 text-sm font-semibold text-emerald-700"><span className="size-2 rounded-full bg-emerald-500" /> Active</div><div className="flex items-center justify-between text-sm"><span className="flex items-center gap-2 text-slate-500"><Filter className="size-4 text-sky-500" /> Current Status</span><span className="font-medium">Filtering</span></div><div className="flex items-center justify-between text-sm"><span className="text-slate-500">Last Cycle</span><span className="font-medium">Today, 5:42 PM</span></div></CardContent></Card>
                </section>

                <section className="mt-6 grid gap-4 sm:grid-cols-3">{summaryMetrics.map(({ icon: Icon, label, value, detail }) => <Card key={label} className="bg-white shadow-sm ring-slate-200/80"><CardContent className="p-5"><Icon className="size-4 text-sky-500" /><p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p><p className="mt-1 font-heading text-2xl font-semibold tracking-tight">{value}</p><p className="mt-1 text-xs text-emerald-600">{detail}</p></CardContent></Card>)}</section>

                <section className="mt-6"><Card className="bg-white shadow-sm ring-slate-200/80"><CardHeader className="flex flex-col gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between"><div><CardTitle className="text-base">Water Quality History</CardTitle><p className="mt-1 text-xs text-slate-500">Static turbidity readings for the selected period</p></div><div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1" role="group" aria-label="Water quality history range">{(Object.keys(historyData) as HistoryRange[]).map((option) => <Button key={option} type="button" variant={range === option ? "default" : "ghost"} size="sm" onClick={() => setRange(option)} className={range === option ? "bg-sky-500 text-white hover:bg-sky-600" : "text-slate-500"}>{option}</Button>)}</div></CardHeader><CardContent className="p-4 sm:p-6">{historyData[range].length === 0 ? <EmptyQualityState /> : <ChartContainer config={chartConfig} className="h-72 w-full aspect-auto"><ResponsiveContainer width="100%" height="100%"><LineChart data={historyData[range]} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}><CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="4 4" /><XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} /><YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} /><Tooltip contentStyle={{ border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12 }} formatter={(value) => [`${value} NTU`, "Turbidity"]} /><Line type="monotone" dataKey="turbidity" stroke="var(--color-turbidity)" strokeWidth={3} dot={{ r: 4, fill: "#0ea5e9", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} /></LineChart></ResponsiveContainer></ChartContainer>}</CardContent></Card></section>

                <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
                    <Card className="bg-white shadow-sm ring-slate-200/80"><CardHeader><CardTitle className="text-base">Quality Status</CardTitle></CardHeader><CardContent className="space-y-4 p-5 pt-0 sm:p-6 sm:pt-0"><StatusDescription tone="good" title="Good" description="Water condition is within normal range." /><StatusDescription tone="warning" title="Warning" description="Water condition requires attention." /><StatusDescription tone="poor" title="Poor" description="Water condition is outside the normal range." /></CardContent></Card>
                    <Card className="bg-white shadow-sm ring-slate-200/80"><CardHeader className="flex flex-row items-center justify-between"><CardTitle className="text-base">Water Quality Sensor</CardTitle><CheckCircle2 className="size-5 text-emerald-500" /></CardHeader><CardContent className="space-y-4 p-5 pt-0 sm:p-6 sm:pt-0"><div className="flex items-center gap-2 text-sm font-semibold text-emerald-700"><span className="size-2 rounded-full bg-emerald-500" /> Online</div><div className="grid gap-3 text-sm"><div className="flex items-center justify-between"><span className="flex items-center gap-2 text-slate-500"><Wifi className="size-3.5" /> Sensor</span><span className="font-medium">Turbidity Sensor</span></div><div className="flex justify-between"><span className="text-slate-500">Connection</span><span className="font-medium">Connected</span></div><div className="flex justify-between"><span className="text-slate-500">Last Reading</span><span className="font-medium">18 NTU</span></div><div className="flex justify-between"><span className="text-slate-500">Last Updated</span><span className="font-medium">Just now</span></div></div></CardContent></Card>
                </section>

                <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
                    <Card className="bg-white shadow-sm ring-slate-200/80"><CardHeader><CardTitle className="text-base">Recent Readings</CardTitle></CardHeader><CardContent className="p-0"><div className="hidden grid-cols-3 border-y border-slate-100 px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate-400 sm:grid"><span>Time</span><span>Turbidity</span><span>Status</span></div>{recentReadings.map((reading) => <div key={reading.time} className="grid gap-1 border-b border-slate-100 px-5 py-3 last:border-0 sm:grid-cols-3 sm:gap-0"><span className="text-sm font-medium text-slate-800">{reading.time}</span><span className="text-sm text-slate-600">{reading.turbidity}</span><span className={`flex items-center gap-2 text-xs font-medium ${statusClasses[reading.tone].split(" ")[1]}`}><span className={`size-1.5 rounded-full ${statusDots[reading.tone]}`} /> {reading.status}</span></div>)}</CardContent></Card>
                    <Card className="bg-white shadow-sm ring-slate-200/80"><CardHeader><CardTitle className="text-base">Water Quality Alert</CardTitle></CardHeader><CardContent className="rounded-b-xl bg-emerald-50/70 p-5 sm:p-6"><div className="flex items-start gap-3 text-emerald-800"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" /><div><p className="font-semibold">Water quality is within normal range</p><p className="mt-1 text-sm leading-6 text-emerald-700">No immediate attention is required.</p></div></div></CardContent></Card>
                </section>

                <section className="mt-6"><Card className="bg-slate-50 shadow-none ring-slate-200/80"><CardHeader><CardTitle className="flex items-center gap-2 text-base"><CircleAlert className="size-4 text-sky-600" /> About Water Quality</CardTitle></CardHeader><CardContent className="p-5 pt-0 text-sm leading-6 text-slate-600 sm:p-6 sm:pt-0"><p>Waterbonia monitors turbidity and other available sensor readings to help track changes in collected rainwater.</p><p className="mt-3 text-xs text-slate-500">Water quality readings are for monitoring purposes and should not be interpreted as confirmation that water is safe for drinking.</p></CardContent></Card></section>
            </main>
        </div>
    )
}

const QualityRow = ({ icon: Icon, label, value, tone }: { icon: LucideIcon; label: string; value: string; tone: QualityTone }) => <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2 text-sm text-slate-500"><Icon className="size-4 text-sky-500" /> {label}</div><span className={`flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[tone]}`}><span className={`size-1.5 rounded-full ${statusDots[tone]}`} /> {value}</span></div>
const StatusDescription = ({ tone, title, description }: { tone: QualityTone; title: string; description: string }) => <div className="flex items-start gap-3"><span className={`mt-1 size-2 shrink-0 rounded-full ${statusDots[tone]}`} /><div><p className="text-sm font-semibold text-slate-800">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{description}</p></div></div>

export default WaterQuality
