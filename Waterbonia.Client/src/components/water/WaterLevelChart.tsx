import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis } from "recharts"
import type { HistoryRange, WaterLevelReading } from "@/types/water"

interface WaterLevelChartProps {
    history: Record<HistoryRange, WaterLevelReading[]>
}

const ranges: HistoryRange[] = ["24 Hours", "7 Days", "30 Days"]

const WaterLevelChart = ({ history }: WaterLevelChartProps) => {
    const [range, setRange] = useState<HistoryRange>("24 Hours")

    return (
        <Card className="bg-white shadow-sm ring-slate-200/80">
            <CardHeader className="flex flex-col gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <CardTitle className="font-sans text-base font-semibold text-slate-950">Water Level History</CardTitle>
                    <p className="mt-1 text-xs text-slate-500">Track tank level changes over time</p>
                </div>
                <div className="flex w-full rounded-lg border-slate-200 bg-slate-50 p-1 sm:w-auto" role="group" aria-label="Select history range">
                    {ranges.map((option) => (
                        <Button key={option} type="button" size="sm" variant={range === option ? "default" : "ghost"} 
                        className={range === option
                        ? "h-7 flex-1 bg-sky-600 px-2 text-xs hover:bg-sky-700 sm:flex-none"
                        : "h-7 flex-1 px-2 text-xs sm:flex-none"} 
                        onClick={() => setRange(option)}>{option}</Button>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="min-w-0 p-4 pt-6 sm:p-6">
                <ChartContainer config={{ percentage: { label: "Water level", color: "#0284c7" } }} className="h-64 w-full min-w-0">
                    <LineChart data={history[range]} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
                        <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} dy={8} />
                        <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(value) => `${value}%`} width={42} />
                        <ChartTooltip content={<ChartTooltipContent formatter={(value) => <span className="font-mono text-slate-900">{value}%</span>} />} />
                        <Line type="monotone" dataKey="percentage" stroke="#0284c7" strokeWidth={2.5} dot={{ r: 4, fill: "#0284c7", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default WaterLevelChart
