export type WaterLevelStatus = "Low" | "Normal" | "High" | "Almost Full"
export type WaterQualityStatus = "Good" | "Warning" | "Poor"
export type SensorConnectionStatus = "Online" | "Offline"
export type CollectionState = "Collecting" | "Standby" | "Tank Full" | "Disabled"
export type HistoryRange = "24 Hours" | "7 Days" | "30 Days"

export interface WaterLevelReading {
    label: string
    percentage: number
}

export interface SensorReading {
    name: string
    status: SensorConnectionStatus
    reading?: string
    lastUpdated: string
}

export interface WaterMonitoringData {
    waterLevel: number
    capacityLiters: number
    currentVolumeLiters: number
    turbidityNtu: number | null
    turbiditySensor: SensorConnectionStatus
    rainDetected: boolean
    rainDurationMinutes: number
    rainSensor: SensorConnectionStatus
    collectionState: CollectionState
    esp32Status: SensorConnectionStatus
    lastUpdated: string
    history: Record<HistoryRange, WaterLevelReading[]>
}

export interface TurbidityThresholds {
    goodMaximum: number
    warningMaximum: number
}

export const TURBIDITY_THRESHOLDS: TurbidityThresholds = {
    goodMaximum: 25,
    warningMaximum: 50,
}
