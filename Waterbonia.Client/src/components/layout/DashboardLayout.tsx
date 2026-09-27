import { Outlet } from "react-router-dom"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "./AppSidebar"

const DashboardLayout = () => (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="min-w-0 bg-slate-50/70">
            <div className="flex items-center border-b border-slate-200/80 bg-white px-4 py-2 md:hidden">
                <SidebarTrigger />
                <span className="ml-2 font-heading text-xs font-semibold tracking-tight text-slate-700">WATERBONIA</span>
            </div>
            <Outlet />
        </SidebarInset>
    </SidebarProvider>
)

export default DashboardLayout