"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerClose,
  DrawerTitle,
} from "@/components/ui/drawer"

const services = [
  {
    title: "AI Solutions",
    description: "Research, design, deploy AI Systems",
    href: "/services/ai",
  },
  {
    title: "AR Experience",
    description: "Immersive augmented reality solutions",
    href: "/services/ar",
  },
  {
    title: "Web3 Exploration",
    description: "Blockchain and decentralized applications",
    href: "/services/web3",
  },
  {
    title: "Business automation",
    description: "Functional systems that automate workflows",
    href: "/services/web-design",
  },
]

const company = [
  {
    title: "About Us",
    description: "Our story and mission",
    href: "/about",
  },
  {
    title: "Team",
    description: "Meet our experts",
    href: "/members",
  },
  {
    title: "Contact",
    description: "Get in touch",
    href: "/contact",
  },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine if we're scrolling up or down
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false)
      } else {
        // Scrolling up
        setIsVisible(true)
      }

      // Update scroll position
      setLastScrollY(currentScrollY)

      // Set scrolled state for styling
      setIsScrolled(currentScrollY > 0)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY])

  return (
    <header
      className={cn(
        "fixed top-0 z-[100] w-full transition-all duration-300 left-0 right-0 overflow-visible",
        "nav-gradient", // Ensure this class is always applied
        isScrolled && "shadow-lg",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 mx-auto w-full max-w-[1200px]">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative h-10 w-10 animate-float-logo">
            <Image
              src="/images/midas-logo.png"
              alt="MidasCreed Logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
            />
          </div>
          <span className="text-xl font-semibold text-white hidden sm:inline">MidasCreed</span>
        </Link>
        <div className="flex-1 items-center justify-center hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-6">
              <NavigationMenuItem>
                <Link href="/learn-more" className={cn(navigationMenuTriggerStyle(), "glow-effect")}>Who We Are</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="glow-effect">What We Do</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex flex-col w-[250px] gap-1 p-4">
                    {services.map((service) => (
                      <ListItem key={service.title} title={service.title} href={service.href}>
                        {service.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/blog" className={cn(navigationMenuTriggerStyle(), "glow-effect")}>What We Think</Link>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuViewport />
          </NavigationMenu>
        </div>
        <div className="items-center space-x-4 hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="glow-effect">Company</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex flex-col w-[250px] gap-1 p-4">
                    {company.map((item) => (
                      <ListItem key={item.title} title={item.title} href={item.href}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuViewport />
          </NavigationMenu>
          <Link href="https://aurum.midascreed.com" target="_blank" rel="noopener noreferrer" className={cn(navigationMenuTriggerStyle(), "glow-effect")}>Aurum AI</Link>
        </div>
        <div className="md:hidden flex items-center">
          <Drawer>
            <DrawerTrigger asChild>
              <button className="p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Open menu</span>
              </button>
            </DrawerTrigger>
            <DrawerContent className="flex flex-col h-[90vh] bg-background">
              <DrawerHeader>
                <DrawerTitle className="sr-only">Main Menu</DrawerTitle>
                <DrawerClose asChild>
                  <button className="absolute right-4 top-4 text-white text-2xl">&times;</button>
                </DrawerClose>
              </DrawerHeader>
              <nav className="flex-1 flex flex-col gap-4 p-6">
                <DrawerClose asChild>
                  <Link href="/learn-more" className="text-lg font-semibold py-2">Who We Are</Link>
                </DrawerClose>
                <details className="group">
                  <summary className="text-lg font-semibold py-2 cursor-pointer">What We Do</summary>
                  <ul className="pl-4 flex flex-col gap-2">
                    {services.map((service) => (
                      <li key={service.title}>
                        <DrawerClose asChild>
                          <Link href={service.href} className="text-base py-1 block">{service.title}</Link>
                        </DrawerClose>
                      </li>
                    ))}
                  </ul>
                </details>
                <DrawerClose asChild>
                  <Link href="/blog" className="text-lg font-semibold py-2">What We Think</Link>
                </DrawerClose>
                <details className="group">
                  <summary className="text-lg font-semibold py-2 cursor-pointer">Company</summary>
                  <ul className="pl-4 flex flex-col gap-2">
                    {company.map((item) => (
                      <li key={item.title}>
                        <DrawerClose asChild>
                          <Link href={item.href} className="text-base py-1 block">{item.title}</Link>
                        </DrawerClose>
                      </li>
                    ))}
                  </ul>
                </details>
              </nav>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Link href="https://aurum.midascreed.com/" target="_blank" rel="noopener noreferrer" className="w-full block text-center bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition">Aurum AI</Link>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li className="w-full">
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            href={href ?? "#"}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            {children && <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>}
          </Link>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
