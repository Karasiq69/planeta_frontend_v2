'use client'
import {Separator} from "@/components/ui/separator"
import {SidebarTrigger,} from "@/components/ui/sidebar"
import {Input} from "@/components/ui/input";

const Navbar = () => {
    return (

        <header
            className="flex border-b h-16 justify-between shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center justify-evenly gap-2 px-4">
                <SidebarTrigger className="-ml-1"/>

                <Separator orientation="vertical" className="mr-2 h-4"/>
                <Input className={'w-full md:w-96'} placeholder={'Поиск....'}/>
            </div>
            <div>
            </div>
        </header>
    )
};
export default Navbar;
