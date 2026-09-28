import { createContext } from "react"

type Theme = "light" | "dark"

type ThemeContextValue = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export { ThemeContext }
export type { Theme }
