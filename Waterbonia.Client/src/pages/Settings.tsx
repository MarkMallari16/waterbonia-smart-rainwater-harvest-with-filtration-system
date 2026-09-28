import { Moon, Sun } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/layout/Header"
import { useTheme } from "@/components/theme/use-theme"

type ThemeOptionProps = {
    icon: typeof Sun
    label: string
    description: string
    value: "light" | "dark"
    selected: boolean
    onSelect: () => void
}

const ThemeOption = ({ icon: Icon, label, description, value, selected, onSelect }: ThemeOptionProps) => (
    <button
        type="button"
        role="radio"
        aria-checked={selected}
        onClick={onSelect}
        className={`flex min-h-24 flex-1 items-center gap-4 rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${selected ? "border-sky-500 bg-sky-50 text-sky-950 ring-1 ring-sky-500 dark:bg-sky-950/40 dark:text-sky-100" : "border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50/50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-sky-700 dark:hover:bg-slate-800"}`}
    >
        <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${selected ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"}`}>
            <Icon className="size-5" />
        </span>
        <span className="min-w-0">
            <span className="block font-semibold">{label}</span>
            <span className={`mt-1 block text-xs leading-5 ${selected ? "text-sky-800 dark:text-sky-200" : "text-slate-500 dark:text-slate-400"}`}>{description}</span>
        </span>
        <span className={`ml-auto flex size-5 shrink-0 items-center justify-center rounded-full border ${selected ? "border-sky-500" : "border-slate-300 dark:border-slate-600"}`}>
            {selected && <span className="size-2.5 rounded-full bg-sky-500" />}
        </span>
        <span className="sr-only">{value} theme</span>
    </button>
)

const Settings = () => {
    const { theme, setTheme } = useTheme()

    return (
        <div className="min-h-screen bg-slate-50/70 text-slate-950 transition-colors dark:bg-slate-950 dark:text-slate-50">
            <Header />
            <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-600">Preferences</p>
                    <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">Settings</h1>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Manage your application preferences.</p>
                </div>

                <Card className="bg-white shadow-sm ring-slate-200/80 dark:bg-slate-900 dark:ring-slate-800">
                    <CardHeader className="border-b border-slate-100 pb-5 dark:border-slate-800">
                        <CardTitle className="text-base">Appearance</CardTitle>
                        <CardDescription className="dark:text-slate-400">Choose how Waterbonia looks on your device.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-5 sm:p-6">
                        <div className="mb-4 flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Theme Mode</h2>
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Your preference is saved on this device.</p>
                            </div>
                            <span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700 dark:bg-sky-950/50 dark:text-sky-300">{theme === "light" ? "Light" : "Dark"}</span>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row" role="radiogroup" aria-label="Theme mode">
                            <ThemeOption icon={Sun} label="Light" description="White/light interface" value="light" selected={theme === "light"} onSelect={() => setTheme("light")} />
                            <ThemeOption icon={Moon} label="Dark" description="Dark interface" value="dark" selected={theme === "dark"} onSelect={() => setTheme("dark")} />
                        </div>
                        <p className="mt-5 text-sm text-slate-500 dark:text-slate-400" role="status">Current theme: <span className="font-medium text-slate-800 dark:text-slate-200">{theme === "light" ? "Light" : "Dark"}</span></p>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

export default Settings
