
import { IconBell, IconCheck } from '@tabler/icons-react'
import { SidebarTrigger } from '../ui/sidebar'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import Rene from "@/assets/rene.jpg"

const Header = () => {
    return (
        <header className="border-b border-slate-200/80 bg-white">
            <div className="mx-auto flex  items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <SidebarTrigger className="hidden md:inline-flex" aria-label="Collapse sidebar" />
                    <div>
                        <p className="font-heading text-sm font-semibold tracking-tight">WATERBONIA</p>
                        <p className="hidden text-[11px] text-slate-500 sm:block">Smart rainwater management</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* <span className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 sm:inline-flex"><IconCheck className="size-3.5" /> All systems normal</span> */}
                    <Button variant="ghost" size="icon" aria-label="Notifications"><IconBell /></Button>
                    <div className="flex items-center gap-2 border-l border-slate-200 pl-2 sm:pl-4">
                        <Avatar className="size-10 shrink-0">
                            <AvatarImage src={Rene} alt="Rene Waterbonia" />
                        </Avatar>

                        <span className="hidden text-sm font-medium text-slate-700 sm:block">Rene Waterbonia</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header