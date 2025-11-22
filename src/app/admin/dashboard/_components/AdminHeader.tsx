"use client"

import { usePathname } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    exact: true,
  },
  {
    name: "Commandes",
    href: "/admin/orders",
  },
  {
    name: "Messages",
    href: "/admin/contacts",
  },
  {
    name: "Clients",
    href: "/admin/customers",
  },
  {
    name: "Statistiques",
    href: "/admin/analytics",
  },
  {
    name: "Paramètres",
    href: "/admin/settings",
  },
]

export function AdminHeader() {
  const pathname = usePathname()

  const getCurrentPage = () => {
    const currentNav = navigation.find((item) => {
      if (item.exact) {
        return pathname === item.href
      }
      return pathname.startsWith(item.href)
    })
    return currentNav?.name || "Dashboard"
  }

  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean)
    const breadcrumbs = []

    if (segments.length > 1) {
      breadcrumbs.push({ name: "Admin", href: "/admin" })

      if (segments.length > 2) {
        const currentPage = getCurrentPage()
        breadcrumbs.push({ name: currentPage, href: pathname })
      }
    }

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {breadcrumbs.length > 0 ? (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((breadcrumb, index) => (
                <div key={breadcrumb.href} className="flex items-center">
                  {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbItem>
                      <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                  ) : (
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                  )}
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        ) : (
          <h1 className="text-lg font-semibold">{getCurrentPage()}</h1>
        )}
      </div>

    </header>
  )
}
