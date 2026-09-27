import { Outlet } from "react-router-dom"
import { IconMenu2 } from "@tabler/icons-react"
import { SidebarInset, SidebarProvider, useSidebar } from "@/components/ui/sidebar"
import AppSidebar from "./AppSidebar"

const MobileSidebarTrigger = () => {
    const { setOpenMobile } = useSidebar()

    return (
        <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setOpenMobile(true)}
            className="inline-flex size-7 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
            <IconMenu2 className="size-4" />
        </button>
    )
}

const DashboardLayout = () => (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="min-w-0 bg-slate-50/70">
            <div className="flex items-center border-b border-slate-200/80 bg-white px-4 py-2 md:hidden">
                <MobileSidebarTrigger />
                <span className="ml-2 font-heading text-xs font-semibold tracking-tight text-slate-700">WATERBONIA</span>
            </div>
            <Outlet />
        </SidebarInset>
    </SidebarProvider>
)

export default DashboardLayout