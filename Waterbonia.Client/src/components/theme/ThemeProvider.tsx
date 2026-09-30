import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { ThemeContext } from "./theme-context"
import type { Theme } from "./theme-context"

const THEME_STORAGE_KEY = "waterbonia-theme"
const AUTHENTICATION_ROUTES = new Set(["/", "/login", "/register", "/auth/callback", "/reset-password"])

const getInitialTheme = (): Theme => {
    if (typeof window === "undefined") return "light"
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light"
}

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(getInitialTheme)
    const { pathname } = useLocation()

    useEffect(() => {
        const isAuthenticationRoute = AUTHENTICATION_ROUTES.has(pathname)
        document.documentElement.classList.toggle("dark", theme === "dark" && !isAuthenticationRoute)
        window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    }, [pathname, theme])

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export { ThemeProvider }
