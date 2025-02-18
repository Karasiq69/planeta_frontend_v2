"use client"

import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface MenuItemProps {
    title: string
    url: string
    icon: LucideIcon
    isActive: boolean
    isOpen?: boolean
}

export function MenuItem({ title, url, icon: Icon, isActive, isOpen }: MenuItemProps) {
    return (
        <div className="w-full px-2">
            <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <Button
                            variant={isActive ? "secondary" : "ghost"}
                            className={cn(
                                'w-full justify-start h-10 mb-1 transition-all duration-200',
                                'hover:bg-accent/40 hover:translate-x-1',
                                isActive && 'flex gap-2 rounded-lg items-center h-10 bg-background shadow-sm border translate-x-1'
                            )}
                            asChild
                        >
                            <Link href={url}>
                                <span className={cn(
                                    isOpen === false ? "" : "mr-4",
                                    "transition-colors duration-200",
                                    isActive ? "text-primary" : "text-muted-foreground",
                                    "group-hover:text-primary"
                                )}>
                                    <Icon size={18}/>
                                </span>
                                <p className={cn(
                                    "max-w-[200px] truncate transition-all duration-200",
                                    isOpen === false ? "-translate-x-96 opacity-0" : "translate-x-0 opacity-100",
                                    isActive ? "font-medium text-primary" : "text-muted-foreground"
                                )}>
                                    {title}
                                </p>
                            </Link>
                        </Button>
                    </TooltipTrigger>
                    {isOpen === false && (
                        <TooltipContent side="right">
                            {title}
                        </TooltipContent>
                    )}
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}