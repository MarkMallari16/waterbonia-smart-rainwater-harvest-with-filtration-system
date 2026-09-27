import type { WaterMonitoringData } from "@/types/water"

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== "false"

const mockWaterData: WaterMonitoringData = {
    waterLevel: 72,
    capacityLiters: 1000,
    currentVolumeLiters: 720,
    turbidityNtu: 18,
    turbiditySensor: "Online",
    rainDetected: true,
    rainDurationMinutes: 24,
    rainSensor: "Online",
    collectionState: "Collecting",
    esp32Status: "Online",
    lastUpdated: "10 seconds ago",
    history: {
        "24 Hours": [
            { label: "08:00", percentage: 42 },
            { label: "10:00", percentage: 48 },
            { label: "12:00", percentage: 55 },
            { label: "14:00", percentage: 63 },
            { label: "16:00", percentage: 72 },
        ],
        "7 Days": [
            { label: "Mon", percentage: 38 },
            { label: "Tue", percentage: 46 },
            { label: "Wed", percentage: 43 },
            { label: "Thu", percentage: 59 },
            { label: "Fri", percentage: 64 },
            { label: "Sat", percentage: 68 },
            { label: "Sun", percentage: 72 },
        ],
        "30 Days": [
            { label: "1", percentage: 28 },
            { label: "6", percentage: 35 },
            { label: "11", percentage: 42 },
            { label: "16", percentage: 51 },
            { label: "21", percentage: 63 },
            { label: "26", percentage: 68 },
            { label: "30", percentage: 72 },
        ],
    },
}

const fetchJson = async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(endpoint)
    if (!response.ok) {
        throw new Error(`Unable to load ${endpoint}`)
    }
    return response.json() as Promise<T>
}

export async function fetchWaterData(): Promise<WaterMonitoringData> {
    if (USE_MOCK_DATA) {
        await new Promise((resolve) => window.setTimeout(resolve, 350))
        return mockWaterData
    }

    const [latest, history] = await Promise.all([
        fetchJson<Omit<WaterMonitoringData, "history">>("/api/sensors/latest"),
        fetchJson<WaterMonitoringData["history"]>("/api/sensors/history"),
    ])

    return { ...latest, history }
}
