import type { ComponentType } from "react"
import {
  IconCloudRain,
  IconDroplet,
  IconGauge,
  IconRipple,
  IconSettingsAutomation,
} from "@tabler/icons-react"

export type StatusTone = "blue" | "green" | "amber" | "red" | "slate"

export interface OverviewMetric {
  label: string
  value: string
  unit?: string
  status: string
  detail?: string
  tone: StatusTone
  icon: ComponentType<{ className?: string }>
}

export interface DashboardData {
  overview: OverviewMetric[]
  tank: {
    percentage: number
    liters: number
    capacity: number
    lastUpdated: string
  }
  rain: {
    status: string
    sensorState: string
    lastDetected: string
    activity: Array<{ label: string; amount: number }>
  }
  activity: Array<{
    title: string
    description: string
    time: string
    tone: StatusTone
    icon: ComponentType<{ className?: string }>
  }>
}

export const dashboardData: DashboardData = {
  overview: [
    {
      label: "Water level",
      value: "72",
      unit: "%",
      status: "Healthy",
      detail: "+14 L since yesterday",
      tone: "blue",
      icon: IconGauge,
    },
    {
      label: "Collected water",
      value: "720",
      unit: "L",
      status: "On track",
      detail: "72% of 1,000 L capacity",
      tone: "green",
      icon: IconDroplet,
    },
    {
      label: "Rain status",
      value: "Active",
      status: "Collecting",
      detail: "Last detected 12 min ago",
      tone: "blue",
      icon: IconCloudRain,
    },
    {
      label: "Water quality",
      value: "3.2",
      unit: "NTU",
      status: "Good",
      detail: "Below 5.0 NTU threshold",
      tone: "green",
      icon: IconRipple,
    },
    {
      label: "Pump status",
      value: "Idle",
      status: "Standby",
      detail: "Last active 2 hours ago",
      tone: "slate",
      icon: IconSettingsAutomation,
    },
  ],
  tank: {
    percentage: 72,
    liters: 720,
    capacity: 1000,
    lastUpdated: "Just now",
  },
  rain: {
    status: "Rain detected",
    sensorState: "Active",
    lastDetected: "12 min ago",
    activity: [
      { label: "8 AM", amount: 2.4 },
      { label: "10 AM", amount: 3.1 },
      { label: "12 PM", amount: 6.8 },
      { label: "2 PM", amount: 4.2 },
      { label: "4 PM", amount: 8.4 },
      { label: "6 PM", amount: 5.6 },
    ],
  },
  activity: [
    {
      title: "Rain detected",
      description: "Rain sensor switched to active",
      time: "12 min ago",
      tone: "blue",
      icon: IconCloudRain,
    },
    {
      title: "Water level changed",
      description: "Tank increased by 14 liters",
      time: "28 min ago",
      tone: "green",
      icon: IconGauge,
    },
    {
      title: "Pump activated",
      description: "Automatic cycle completed",
      time: "2 hours ago",
      tone: "slate",
      icon: IconSettingsAutomation,
    },
    {
      title: "Quality check passed",
      description: "Turbidity measured at 3.2 NTU",
      time: "3 hours ago",
      tone: "green",
      icon: IconRipple,
    },
  ],
}