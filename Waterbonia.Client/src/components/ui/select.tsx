import * as React from "react"
import { cn } from "cn"

function Select({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      data-slot="select"
      className={cn("h-9 w-full appearance-none rounded-lg border border-input bg-background px-3 pr-8 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50", className)}
      {...props}
    />
  )
}

export { Select }