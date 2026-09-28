import { useState } from "react"
import {
    Activity,
    AlertTriangle,
    CheckCircle2,
    Clock3,
    Droplets,
    Gauge,
    Power,
    PowerOff,
    RefreshCw,
    ShieldCheck,
    WifiOff,
} from "lucide-react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import Header from "@/components/layout/Header"

type RuntimeRange = "Today" | "7 Days" | "30 Days"
type RuntimePoint = { label: string; minutes: number }

type StatusTone = "green" | "amber" | "red"

const runtimeData: Record<RuntimeRange, RuntimePoint[]> = {
    Today: [
        { label: "6 AM", minutes: 4 },
        { label: "9 AM", minutes: 8 },
        { label: "12 PM", minutes: 2 },
        { label: "3 PM", minutes: 12 },
        { label: "6 PM", minutes: 24 },
        { label: "9 PM", minutes: 6 },
    ],
    "7 Days": [
        { label: "Mon", minutes: 32 },
        { label: "Tue", minutes: 48 },
        { label: "Wed", minutes: 24 },
        { label: "Thu", minutes: 56 },
        { label: "Fri", minutes: 42 },
        { label: "Sat", minutes: 36 },
        { label: "Sun", minutes: 24 },
    ],
    "30 Days": [
        { label: "Week 1", minutes: 112 },
        { label: "Week 2", minutes: 146 },
        { label: "Week 3", minutes: 98 },
        { label: "Week 4", minutes: 166 },
    ],
}

const runtimeChartConfig = { minutes: { label: "Runtime", color: "#0ea5e9" } }
const isControllerOnline = true

const statusStyles: Record<StatusTone, string> = {
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    red: "bg-rose-50 text-rose-700",
}

const OfflineState = () => (
    <Card className="border-amber-200 bg-amber-50/50 shadow-sm ring-amber-100">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <WifiOff className="size-8 text-amber-600" />
            <h2 className="mt-4 font-semibold text-amber-950">Pump Offline</h2>
            <p className="mt-1 max-w-xs text-sm leading-6 text-amber-800/80">The pump controller is currently not connected.</p>
            <Button type="button" variant="outline" className="mt-4 border-amber-300 bg-white"><RefreshCw className="size-4" /> Refresh</Button>
        </CardContent>
    </Card>
)

const PumpControl = () => {
    const [isPumpOn, setIsPumpOn] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [runtimeRange, setRuntimeRange] = useState<RuntimeRange>("7 Days")

    const requestedState = !isPumpOn
    const confirmPumpChange = () => {
        setIsPumpOn(requestedState)
        setIsDialogOpen(false)
    }

    return (
        <div className="min-h-screen bg-slate-50/70 text-slate-950">
            <Header />
            <main className="mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-600">System controls</p>
                        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">Pump Control</h1>
                        <p className="mt-2 text-sm text-slate-500">Monitor and control your water pump.</p>
                    </div>
                    <p className="flex items-center gap-1.5 text-xs text-slate-400"><Clock3 className="size-3.5" /> Updated just now</p>
                </div>

                {!isControllerOnline ? <OfflineState /> : <>
                    <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
                        <Card className="overflow-hidden border-sky-100 bg-white shadow-sm ring-slate-200/80">
                            <CardContent className="relative flex min-h-72 flex-col items-center justify-center p-6 text-center sm:min-h-80">
                                <div className={`absolute right-6 top-6 rounded-full px-3 py-1 text-xs font-medium ${isPumpOn ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{isPumpOn ? "Running" : "Standby"}</div>
                                <div className={`mb-5 flex size-20 items-center justify-center rounded-full ring-8 ${isPumpOn ? "bg-sky-50 text-sky-500 ring-sky-50/60" : "bg-slate-100 text-slate-400 ring-slate-100/60"}`}>
                                    {isPumpOn ? <Power className="size-10" strokeWidth={1.6} /> : <PowerOff className="size-10" strokeWidth={1.6} />}
                                </div>
                                <div className="flex items-center gap-2 text-xl font-semibold"><span className={`size-2.5 rounded-full ${isPumpOn ? "bg-emerald-500" : "bg-slate-400"}`} /> {isPumpOn ? "ON" : "OFF"}</div>
                                <p className="mt-2 text-sm text-slate-500">Pump is currently {isPumpOn ? "on" : "off"}</p>
                                <Button type="button" onClick={() => setIsDialogOpen(true)} className="mt-6 min-w-32 bg-sky-500 hover:bg-sky-600">{isPumpOn ? "Turn Off" : "Turn On"}</Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-white shadow-sm ring-slate-200/80">
                            <CardHeader><CardTitle className="text-base">Pump Information</CardTitle></CardHeader>
                            <CardContent className="space-y-4 p-5 pt-0 sm:p-6 sm:pt-0">
                                <div className="flex items-center justify-between text-sm"><span className="text-slate-500">Pump Status</span><span className="flex items-center gap-2 font-medium text-emerald-700"><span className="size-2 rounded-full bg-emerald-500" /> Online</span></div>
                                <Separator />
                                <div className="flex items-center justify-between text-sm"><span className="text-slate-500">Current State</span><span className="font-semibold">{isPumpOn ? "ON" : "OFF"}</span></div>
                                <div className="flex items-center justify-between text-sm"><span className="text-slate-500">Power Source</span><span className="font-medium">12V</span></div>
                                <div className="flex items-center justify-between text-sm"><span className="text-slate-500">Last Activated</span><span className="font-medium">Today, 4:32 PM</span></div>
                                <div className="flex items-center justify-between text-sm"><span className="text-slate-500">Runtime Today</span><span className="font-medium">24 min</span></div>
                            </CardContent>
                        </Card>
                    </section>

                    <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
                        <Card className="bg-white shadow-sm ring-slate-200/80">
                            <CardHeader><CardTitle className="text-base">Pump Control</CardTitle><p className="text-sm text-slate-500">Manually control the water pump from your Waterbonia system.</p></CardHeader>
                            <CardContent className="flex items-center justify-between gap-4 p-5 pt-0 sm:p-6 sm:pt-0"><div><p className="font-medium">Pump</p><p className="mt-1 text-xs text-slate-500">{isPumpOn ? "Running now" : "Ready when needed"}</p></div><Switch checked={isPumpOn} onCheckedChange={() => setIsDialogOpen(true)} aria-label="Toggle pump" /></CardContent>
                        </Card>
                        <Card className="bg-white shadow-sm ring-slate-200/80">
                            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><ShieldCheck className="size-4 text-emerald-600" /> Safety Status</CardTitle></CardHeader>
                            <CardContent className="grid gap-3 p-5 pt-0 sm:p-6 sm:pt-0"><StatusRow icon={Droplets} label="Water Level" value="Normal" tone="green" /><StatusRow icon={CheckCircle2} label="Water Quality" value="Good" tone="green" /><StatusRow icon={ShieldCheck} label="Pump Protection" value="Ready" tone="green" /></CardContent>
                        </Card>
                    </section>

                    {isPumpOn && <div className="mt-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-900"><AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" /><div><p className="font-semibold">Manual Control</p><p className="mt-1 text-xs leading-5 text-amber-800/80">The pump is currently set to ON. Make sure sufficient water is available before operating the pump.</p></div></div>}

                    <section className="mt-6 grid gap-4 sm:grid-cols-3">
                        <RuntimeStat icon={Clock3} label="Today" value="24 min" />
                        <RuntimeStat icon={Activity} label="This Week" value="2h 18m" />
                        <RuntimeStat icon={Gauge} label="Total Runtime" value="18h 42m" />
                    </section>

                    <section className="mt-6">
                        <Card className="bg-white shadow-sm ring-slate-200/80">
                            <CardHeader className="flex flex-col gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between"><div><CardTitle className="text-base">Pump Runtime History</CardTitle><p className="mt-1 text-xs text-slate-500">Static runtime history for the selected period</p></div><div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1" role="group" aria-label="Pump runtime range">{(Object.keys(runtimeData) as RuntimeRange[]).map((option) => <Button key={option} type="button" variant={runtimeRange === option ? "default" : "ghost"} size="sm" onClick={() => setRuntimeRange(option)} className={runtimeRange === option ? "bg-sky-500 text-white hover:bg-sky-600" : "text-slate-500"}>{option}</Button>)}</div></CardHeader>
                            <CardContent className="p-4 sm:p-6"><ChartContainer config={runtimeChartConfig} className="h-72 w-full aspect-auto"><ResponsiveContainer width="100%" height="100%"><BarChart data={runtimeData[runtimeRange]} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}><CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="4 4" /><XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} /><YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={(value) => `${value}`} /><Tooltip cursor={{ fill: "#f0f9ff" }} contentStyle={{ border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12 }} formatter={(value) => [`${value} min`, "Runtime"]} /><Bar dataKey="minutes" fill="var(--color-minutes)" radius={[5, 5, 0, 0]} maxBarSize={42} /></BarChart></ResponsiveContainer></ChartContainer></CardContent>
                        </Card>
                    </section>

                    <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
                        <Card className="bg-white shadow-sm ring-slate-200/80"><CardHeader><CardTitle className="text-base">Recent Activity</CardTitle></CardHeader><CardContent className="space-y-5 p-5 pt-0 sm:p-6 sm:pt-0"><ActivityItem icon={Power} title="Pump turned ON" time="Today, 4:32 PM" detail="Runtime: 12 minutes" active /><ActivityItem icon={PowerOff} title="Pump turned OFF" time="Today, 4:44 PM" detail="" /><ActivityItem icon={Power} title="Pump turned ON" time="Today, 1:20 PM" detail="Runtime: 8 minutes" active /></CardContent></Card>
                        <Card className="bg-white shadow-sm ring-slate-200/80"><CardHeader><CardTitle className="text-base">Water Level</CardTitle></CardHeader><CardContent className="p-5 pt-0 sm:p-6 sm:pt-0"><div className="flex items-end justify-between"><div><p className="font-heading text-3xl font-semibold">72%</p><p className="mt-1 text-sm text-slate-500">Safe to operate pump</p></div><Droplets className="size-8 text-sky-500" /></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-[72%] rounded-full bg-sky-500" /></div><p className="mt-3 text-xs text-slate-500">Tank level is within the normal operating range.</p></CardContent></Card>
                    </section>
                </>}
            </main>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogTitle>{requestedState ? "Turn On Pump?" : "Turn Off Pump?"}</DialogTitle>
                    <DialogDescription>Are you sure you want to turn {requestedState ? "on" : "off"} the water pump?</DialogDescription>
                    <div className="flex justify-end gap-2"><DialogClose render={<Button type="button" variant="outline">Cancel</Button>} /><Button type="button" onClick={confirmPumpChange} className="bg-sky-500 hover:bg-sky-600">{requestedState ? "Turn On Pump" : "Turn Off Pump"}</Button></div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

const StatusRow = ({ icon: Icon, label, value, tone }: { icon: typeof CheckCircle2; label: string; value: string; tone: StatusTone }) => <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2 text-sm text-slate-500"><Icon className="size-4 text-emerald-500" /> {label}</div><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[tone]}`}>{value}</span></div>
const RuntimeStat = ({ icon: Icon, label, value }: { icon: typeof Clock3; label: string; value: string }) => <Card className="bg-white shadow-sm ring-slate-200/80"><CardContent className="p-5"><Icon className="size-4 text-sky-500" /><p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p><p className="mt-1 font-heading text-2xl font-semibold tracking-tight">{value}</p></CardContent></Card>
const ActivityItem = ({ icon: Icon, title, time, detail, active = false }: { icon: typeof Power; title: string; time: string; detail: string; active?: boolean }) => <div className="flex gap-3"><div className={`mt-1 flex size-8 shrink-0 items-center justify-center rounded-full ${active ? "bg-sky-50 text-sky-600" : "bg-slate-100 text-slate-500"}`}><Icon className="size-4" /></div><div><p className="text-sm font-medium text-slate-800">{title}</p><p className="mt-1 flex items-center gap-1 text-xs text-slate-500"><Clock3 className="size-3" /> {time}</p>{detail && <p className="mt-1 text-xs text-slate-400">{detail}</p>}</div></div>

export default PumpControl
