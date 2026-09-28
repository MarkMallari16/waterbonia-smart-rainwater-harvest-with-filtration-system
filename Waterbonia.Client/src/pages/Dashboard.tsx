import { useEffect, useState } from "react"
import { IconBell, IconCheck } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import OverviewCard from "@/components/dashboard/OverviewCard"
import RecentActivity from "@/components/dashboard/RecentActivity"
import RainMonitoring from "@/components/dashboard/RainMonitoring"
import WaterTankCard from "@/components/dashboard/WaterTankCard"
import { dashboardData } from "@/components/dashboard/dashboard-data"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import Rene from "@/assets/rene.jpg"
import Header from "@/components/layout/Header"

const LoadingState = () => (
    <div className="space-y-6" aria-label="Loading dashboard data">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {Array.from({ length: 5 }, (_, index) => (
                <Card key={index} className="bg-white shadow-sm ring-slate-200/80">
                    <CardContent className="space-y-4 p-4 sm:p-5">
                        <div className="flex items-start justify-between">
                            <Skeleton className="size-8 rounded-lg" />
                            <Skeleton className="h-5 w-16 rounded-full" />
                        </div>
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-8 w-28" />
                        <Skeleton className="h-3 w-36" />
                    </CardContent>
                </Card>
            ))}
        </section>
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
            <Card>
                <CardContent className="grid gap-6 p-5 sm:grid-cols-[minmax(140px,0.8fr)_1fr] sm:p-6">
                    <Skeleton className="mx-auto h-52 w-36 rounded-b-[2rem] rounded-t-xl sm:h-60 sm:w-40" />
                    <div className="space-y-5">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-9 w-32" />
                        <Skeleton className="h-2 w-full" />
                        <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                            <Skeleton className="h-8 w-20" />
                            <Skeleton className="h-8 w-20" />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="space-y-5 p-5 sm:p-6">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-24 rounded-full" />
                    <Skeleton className="h-44 w-full" />
                    <Skeleton className="h-3 w-36" />
                </CardContent>
            </Card>
        </section>
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
            <Card><CardContent className="space-y-6 p-5 sm:p-6"><Skeleton className="h-6 w-52" /><Skeleton className="h-12 w-full" /><Skeleton className="h-10 w-full" /></CardContent></Card>
            <Card><CardContent className="space-y-4 p-5 sm:p-6"><Skeleton className="h-5 w-36" /><Skeleton className="h-12 w-full" /><Skeleton className="h-12 w-full" /><Skeleton className="h-12 w-full" /></CardContent></Card>
        </section>
    </div>
)

const Dashboard = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const initialLoad = window.setTimeout(() => setLoading(false), 500)
        return () => window.clearTimeout(initialLoad)
    }, [])

    return (
        <div className="min-h-screen bg-slate-50/70 text-slate-950">
            <Header />
            <main className="mx-auto  px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-600">System overview</p>
                        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">Dashboard</h1>
                        <p className="mt-2 text-sm text-slate-500">Monitor your rainwater collection system.</p>
                    </div>
                    <p className="text-xs text-slate-400">Last synced just now</p>
                </div>
                {loading ? <LoadingState /> : <>
                    <section aria-label="System overview metrics" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {dashboardData.overview.map((metric) => <OverviewCard key={metric.label} metric={metric} />)}
                    </section>
                    <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
                        <WaterTankCard tank={dashboardData.tank} />
                        <RainMonitoring rain={dashboardData.rain} />
                    </section>
                    <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
                        <Card className="bg-slate-950 text-white shadow-sm ring-slate-900">
                            <CardContent className="flex h-full flex-col justify-between gap-6 p-5 sm:p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">System status</p>
                                        <h2 className="mt-2 font-heading text-xl font-semibold">Your system is running smoothly</h2>
                                        <p className="mt-2 max-w-md text-sm leading-6 text-slate-300">Sensors are online and collecting the latest readings from your rainwater system.</p>
                                    </div>
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300"><IconCheck className="size-5" /></span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-5 sm:grid-cols-3">
                                    <div><p className="text-xs text-slate-400">Sensors online</p><p className="mt-1 text-lg font-semibold">5 / 5</p></div>
                                    <div><p className="text-xs text-slate-400">Pump cycles</p><p className="mt-1 text-lg font-semibold">12</p></div>
                                    <div><p className="text-xs text-slate-400">Uptime</p><p className="mt-1 text-lg font-semibold">99.8%</p></div>
                                </div>
                            </CardContent>
                        </Card>
                        <RecentActivity activity={dashboardData.activity} />
                    </section>
                </>}
            </main>
        </div>
    )
}

export default Dashboard