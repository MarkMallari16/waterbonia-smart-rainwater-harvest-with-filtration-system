import { useCallback, useEffect, useState } from "react"
import { IconAlertTriangle } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import WaterLevelCard from "@/components/water/WaterLevelCard"
import WaterLevelChart from "@/components/water/WaterLevelChart"
import WaterQualityCard from "@/components/water/WaterQualityCard"
import RainStatusCard from "@/components/water/RainStatusCard"
import CollectionStatusCard from "@/components/water/CollectionStatusCard"
import SensorStatusList from "@/components/water/SensorStatusList"
import { fetchWaterData } from "@/services/waterService"
import { TURBIDITY_THRESHOLDS, type WaterMonitoringData, type WaterLevelStatus, type WaterQualityStatus } from "@/types/water"
import Header from "@/components/layout/Header"

const getLevelStatus = (level: number): WaterLevelStatus => {
    if (level <= 20) return "Low"
    if (level <= 80) return "Normal"
    if (level <= 95) return "High"
    return "Almost Full"
}

const getQualityStatus = (turbidity: number | null): WaterQualityStatus => {
    if (turbidity === null) return "Warning"
    if (turbidity <= TURBIDITY_THRESHOLDS.goodMaximum) return "Good"
    if (turbidity <= TURBIDITY_THRESHOLDS.warningMaximum) return "Warning"
    return "Poor"
}

const LoadingState = () => <div className="space-y-6"><div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)]"><Card><CardContent className="grid gap-6 p-6 sm:grid-cols-2"><Skeleton className="mx-auto h-64 w-40 rounded-2xl" /><div className="space-y-4"><Skeleton className="h-8 w-32" /><Skeleton className="h-12 w-44" /><Skeleton className="h-3 w-full" /><Skeleton className="h-16 w-full" /></div></CardContent></Card><Card><CardContent className="space-y-5 p-6"><Skeleton className="h-5 w-32" /><Skeleton className="h-12 w-24" /><Skeleton className="h-24 w-full" /></CardContent></Card></div><Card><CardContent className="p-6"><Skeleton className="h-64 w-full" /></CardContent></Card></div>

const WaterMonitoring = () => {
    const [data, setData] = useState<WaterMonitoringData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const loadData = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            setData(await fetchWaterData())
        } catch {
            setError("Unable to load water data. Please check the ESP32 connection or try again.")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        const initialLoad = window.setTimeout(() => { void loadData() }, 0)
        return () => window.clearTimeout(initialLoad)
    }, [loadData])

    const levelStatus = data ? getLevelStatus(data.waterLevel) : "Normal"
    const qualityStatus = data ? getQualityStatus(data.turbidityNtu) : "Warning"
    const remainingCapacity = data ? data.capacityLiters - data.currentVolumeLiters : 0
    const sensors = data ? [
        { name: "Water Level", status: data.esp32Status, reading: `${data.waterLevel}%`, lastUpdated: data.lastUpdated },
        { name: "Turbidity", status: data.turbiditySensor, reading: data.turbidityNtu === null ? undefined : `${data.turbidityNtu} NTU`, lastUpdated: data.lastUpdated },
        { name: "Rain Sensor", status: data.rainSensor, reading: data.rainDetected ? "Detected" : "No rain", lastUpdated: data.lastUpdated },
        { name: "ESP32", status: data.esp32Status, lastUpdated: data.lastUpdated },
    ] : []

    return (
        <div className="min-h-screen bg-slate-50/70 text-slate-950">
            {/* <header className="border-b border-slate-200/80 bg-white">
                <div className="mx-auto flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <SidebarTrigger
                            className="hidden md:inline-flex"
                            aria-label="Collapse sidebar"
                        />

                        <div>
                            <p className="font-heading text-sm font-semibold tracking-tight">
                                WATERBONIA
                            </p>

                            <p className="hidden text-[11px] text-slate-500 sm:block">
                                Smart rainwater management
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="hidden items-center gap-2 text-xs text-slate-400 sm:inline-flex">
                            <IconWifi className="size-3.5 text-emerald-500" />
                            API connected
                        </span>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => void loadData()}
                            disabled={loading}
                            aria-label="Refresh sensor data"
                        >
                            <RefreshCw
                                className={loading ? "animate-spin" : ""}
                            />

                            <span className="hidden sm:inline">
                                Refresh data
                            </span>
                        </Button>
                    </div>
                </div>
            </header> */}
            <Header />
            <main className="mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-600">
                            Live system view
                        </p>

                        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                            Water Monitoring
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Monitor your rainwater tank, water level, and water
                            quality in real time.
                        </p>
                    </div>

                    <p className="text-xs text-slate-400">
                        Last updated {data?.lastUpdated ?? "loading..."}
                    </p>
                </div>

                {loading && !data ? (
                    <LoadingState />
                ) : error ? (
                    <Card className="border-rose-200 bg-rose-50/60 shadow-sm ring-rose-200">
                        <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center">
                            <span className="rounded-full bg-rose-100 p-3 text-rose-600">
                                <IconAlertTriangle className="size-5" />
                            </span>

                            <div className="flex-1">
                                <h2 className="font-semibold text-rose-950">
                                    Unable to load water data.
                                </h2>

                                <p className="mt-1 text-sm text-rose-800/80">
                                    {error}
                                </p>
                            </div>

                            <Button
                                variant="outline"
                                onClick={() => void loadData()}
                            >
                                Retry
                            </Button>
                        </CardContent>
                    </Card>
                ) : data ? (
                    <div className="space-y-6">
                        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)]">
                            <WaterLevelCard
                                percentage={data.waterLevel}
                                currentVolume={data.currentVolumeLiters}
                                capacity={data.capacityLiters}
                                status={levelStatus}
                            />

                            <WaterQualityCard
                                status={qualityStatus}
                                turbidity={data.turbidityNtu}
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <Card className="bg-white shadow-sm ring-slate-200/80">
                                <CardContent className="p-5">
                                    <p className="text-xs text-slate-500">
                                        Current level
                                    </p>

                                    <p className="mt-2 font-heading text-2xl font-semibold text-slate-950">
                                        {data.currentVolumeLiters} L
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                        {data.waterLevel}% full
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-white shadow-sm ring-slate-200/80">
                                <CardContent className="p-5">
                                    <p className="text-xs text-slate-500">
                                        Available capacity
                                    </p>

                                    <p className="mt-2 font-heading text-2xl font-semibold text-slate-950">
                                        {remainingCapacity} L
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Remaining
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-white shadow-sm ring-slate-200/80">
                                <CardContent className="p-5">
                                    <p className="text-xs text-slate-500">
                                        Total capacity
                                    </p>

                                    <p className="mt-2 font-heading text-2xl font-semibold text-slate-950">
                                        {data.capacityLiters} L
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Tank capacity
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        <WaterLevelChart history={data.history} />

                        {data.waterLevel >= 81 && (
                            <Card className="border-amber-200 bg-amber-50/70 shadow-sm ring-amber-200">
                                <CardContent className="flex items-start gap-3 p-5">
                                    <IconAlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />

                                    <div>
                                        <h2 className="font-semibold text-amber-950">
                                            {data.waterLevel === 100
                                                ? "Tank Full"
                                                : "Tank Nearly Full"}
                                        </h2>

                                        <p className="mt-1 text-sm leading-6 text-amber-900/80">
                                            The tank is currently at{" "}
                                            {data.waterLevel}% capacity. Consider
                                            activating the water pump or opening
                                            the valve through the backend controls.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {data.waterLevel <= 20 && (
                            <Card className="border-rose-200 bg-rose-50/70 shadow-sm ring-rose-200">
                                <CardContent className="flex items-start gap-3 p-5">
                                    <IconAlertTriangle className="mt-0.5 size-5 shrink-0 text-rose-600" />

                                    <div>
                                        <h2 className="font-semibold text-rose-950">
                                            Low water level
                                        </h2>

                                        <p className="mt-1 text-sm text-rose-900/80">
                                            The tank is critically low at{" "}
                                            {data.waterLevel}%. Monitor collection
                                            and refill activity.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <div className="grid gap-6 lg:grid-cols-2">
                            <RainStatusCard
                                detected={data.rainDetected}
                                durationMinutes={data.rainDurationMinutes}
                                sensorStatus={data.rainSensor}
                            />

                            <CollectionStatusCard
                                state={data.collectionState}
                            />
                        </div>

                        <SensorStatusList sensors={sensors} />
                    </div>
                ) : null}
            </main>
        </div>
    );
}

export default WaterMonitoring
