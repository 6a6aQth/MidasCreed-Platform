"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Lightbulb, Rocket, Cpu, Server } from "lucide-react"
import { ShineBorder } from "@/components/ui/shine-border"

interface ServiceCardProps {
  title: string
  description: string
  href: string
  icon: keyof typeof icons
  className?: string
}

const icons = {
  Lightbulb,
  Rocket,
  Cpu,
  Server,
}

export function ServiceCard({ title, description, href, icon: Icon, className }: ServiceCardProps) {
  const IconComponent = icons[Icon]

  return (
    <Link href={href} className="block group">
      <ShineBorder
        borderRadius={16}
        borderWidth={1}
        duration={10}
        color={["hsla(var(--secondary)/30%)", "hsla(var(--primary)/30%)"]}
        className={cn(
          "w-full min-w-0 transition-all duration-300 hover:scale-[1.02]",
          "bg-gray-950/80 backdrop-blur-sm",
          className,
        )}
      >
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative z-10">
              <div className="absolute inset-0 rounded-full bg-secondary/10 blur-md opacity-70 transition-all duration-300 group-hover:bg-secondary/20" />
              <div className="relative h-12 w-12 rounded-full bg-gray-900/90 p-2.5">
                <IconComponent className="h-full w-full text-secondary transition-colors duration-300 group-hover:text-secondary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white group-hover:text-secondary transition-colors duration-300 z-10">
              {title}
            </h3>
          </div>
          <p className="text-gray-400 leading-relaxed">{description}</p>
          <div className="flex items-center text-secondary">
            <span className="text-sm font-medium">Learn More</span>
            <svg
              className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </ShineBorder>
    </Link>
  )
}
