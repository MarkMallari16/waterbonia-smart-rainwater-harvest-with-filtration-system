import { NavLink, useLocation } from "react-router-dom"
import {
    IconChartBar,
    IconCloudRain,
    IconDroplet,
    IconDropletBolt,
    IconGauge,
    IconHistory,
    IconLogout,
    IconSettings,
    IconUserCircle,
    IconWind,
} from "@tabler/icons-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarImage } from "../ui/avatar"
import Rene from "@/assets/rene.jpg"
const navigationItems = [
    { label: "Dashboard", to: "/dashboard", icon: IconGauge },
    { label: "Water Monitoring", to: "/water-monitoring", icon: IconDroplet },
    { label: "Rainfall", to: "/rainfall", icon: IconCloudRain },
    { label: "Water Quality", to: "/water-quality", icon: IconWind },
    { label: "Pump Control", to: "/pump-control", icon: IconSettings },
    { label: "History", to: "/history", icon: IconHistory },
    { label: "Analytics", to: "/analytics", icon: IconChartBar },
]

const navLabelClass = "max-w-40 overflow-hidden whitespace-nowrap transition-[opacity,max-width] duration-150 ease-out"

const AppSidebar = () => {
    const location = useLocation()
    const { state } = useSidebar()
    const navLabelStyle = {
        maxWidth: state === "collapsed" ? 0 : 160,
        opacity: state === "collapsed" ? 0 : 1,
    }

    return (
        <>
            <Sidebar collapsible="icon" className="waterbonia-sidebar border-slate-200 bg-white transition-none">
                <SidebarHeader className="border-b border-slate-100 p-4 group-data-[collapsible=icon]:p-2">
                    <div className="flex items-center gap-3 overflow-hidden group-data-[collapsible=icon]:justify-center">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white shadow-sm shadow-sky-200 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:rounded-lg">
                            <IconDropletBolt className="size-5" />
                        </div>
                        <div className="min-w-0 group-data-[collapsible=icon]:hidden">
                            <p className="truncate font-heading text-sm font-semibold tracking-tight text-slate-950">WATERBONIA</p>
                            <p className="truncate text-[11px] text-slate-500">Rainwater Management</p>
                        </div>
                    </div>
                </SidebarHeader>
                <SidebarContent className="bg-white">
                    <SidebarGroup className="p-3 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:p-2">
                        <SidebarGroupLabel className="px-2 text-[10px] uppercase tracking-[0.14em] text-slate-400">Navigation</SidebarGroupLabel>
                        <SidebarMenu className="gap-1 group-data-[collapsible=icon]:items-center">
                            {navigationItems.map((item) => {
                                const Icon = item.icon
                                const isActive = location.pathname === item.to

                                return (
                                    <SidebarMenuItem key={item.to}>
                                        <SidebarMenuButton
                                            render={<NavLink to={item.to} />}
                                            isActive={isActive}
                                            tooltip={item.label}
                                            className="text-slate-600 data-active:bg-sky-50 data-active:text-sky-700 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0"
                                        >
                                            <Icon />
                                            <span className={navLabelClass} style={navLabelStyle}>{item.label}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter className="border-t border-slate-100 bg-white p-3 group-data-[collapsible=icon]:p-2">
                    <SidebarMenu className="gap-1 group-data-[collapsible=icon]:items-center">
                        <SidebarMenuItem>
                            <SidebarMenuButton render={<NavLink to="/settings" />} tooltip="Settings" className="text-slate-600 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0">
                                <IconSettings />
                                <span className={navLabelClass} style={navLabelStyle}>Settings</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton render={<NavLink to="/profile" />} tooltip="Profile" className="text-slate-600 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0">
                                <IconUserCircle />
                                <span className={navLabelClass} style={navLabelStyle}>Profile</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton render={<NavLink to="/" />} tooltip="Logout" className="text-slate-600 hover:bg-rose-50 hover:text-rose-700 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0">
                                <IconLogout />
                                <span className={navLabelClass} style={navLabelStyle}>Logout</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                    <div className="mt-3 flex w-full items-center gap-2 border-t border-slate-100 pt-3 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0">
                        <Avatar className="size-8 shrink-0">
                            <AvatarImage src={Rene} alt="Rene Waterbonia" />
                        </Avatar>
                        <div className="min-w-0 group-data-[collapsible=icon]:hidden">
                            <p className="truncate text-xs font-semibold text-slate-800">Rene Waterbonia</p>
                            <p className="truncate text-[11px] text-slate-500">System owner</p>
                        </div>
                    </div>
                </SidebarFooter>
            </Sidebar>
        </>
    )
}

export default AppSidebar