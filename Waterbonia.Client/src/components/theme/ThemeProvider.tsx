import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { ThemeContext } from "./theme-context"
import type { Theme } from "./theme-context"

const THEME_STORAGE_KEY = "waterbonia-theme"
const getInitialTheme = (): Theme => {
    if (typeof window === "undefined") return "light"
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light"
}

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(getInitialTheme)

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark")
        window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    }, [theme])

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export { ThemeProvider }
