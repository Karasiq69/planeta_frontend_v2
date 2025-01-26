"use client"

import Link from "next/link"
import {usePathname} from "next/navigation"
import {Car, LayoutDashboard, Package, Settings, ShoppingCart, Users, Wallet} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"
import {cn} from "@/lib/utils"

interface NavMainProps {
  isOpen?: boolean;
}

export function NavMain({ isOpen }: NavMainProps) {
  const pathname = usePathname()
  const items = [
    {
      title: "Дашборд",
      url: "/dashboard",
      icon: LayoutDashboard
    },
    {
      title: "Заказы",
      url: "/orders",
      icon: ShoppingCart
    },
    {
      title: "Автомобили",
      url: "/cars",
      icon: Car
    },
    {
      title: "Клиенты",
      url: "/clients",
      icon: Users
    },
    {
      title: "Склад",
      url: "/warehouse",
      icon: Package
    },
    {
      title: "Платежи",
      url: "/payments",
      icon: Wallet
    },
    {
      title: "Настройки",
      url: "/settings",
      icon: Settings
    }
  ]

  return (

      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col    items-start space-y-1 px-2">
          <li className="w-full pt-5">
            {isOpen || isOpen === undefined ? (
              <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                Меню
              </p>
            ) : null}

            {items.map((item) => (
              <div className="w-full" key={item.title}>
                <TooltipProvider disableHoverableContent>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={pathname.startsWith(item.url) ? "secondary" : "ghost"}
                        className="w-full justify-start h-10 mb-1"
                        asChild
                      >
                        <Link href={item.url}>
                          <span className={cn(isOpen === false ? "" : "mr-4")}>
                            <item.icon size={18} />
                          </span>
                          <p className={cn(
                            "max-w-[200px] truncate",
                            isOpen === false ? "-translate-x-96 opacity-0" : "translate-x-0 opacity-100"
                          )}>
                            {item.title}
                          </p>
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    {isOpen === false && (
                      <TooltipContent side="right">
                        {item.title}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
          </li>

        </ul>
      </nav>
  )
}