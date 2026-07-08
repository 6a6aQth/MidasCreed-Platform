"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

const logos = [
  {
    src: "/images/partners/activerse-logo.png",
    alt: "Activerse",
    href: "#",
    name: "Activerse",
  },
  {
    src: "/images/partners/nirvana-logo.png",
    alt: "Nirvana Tours & Travel",
    href: "#",
    name: "Nirvana Tours & Travel",
  },
  {
    src: "/images/partners/sunnymoney-logo.png",
    alt: "Sunny Money",
    href: "#",
    name: "Sunny Money",
  },
  {
    src: "/images/partners/lauryn-logo.png",
    alt: "Lauryn Luxe Beauty Studio",
    href: "#",
    name: "Lauryn Luxe Beauty Studio",
  },
  {
    src: "/images/partners/greenhouse-logo.png",
    alt: "Greenhouse",
    href: "#",
    name: "Greenhouse",
  },
  {
    src: "/images/partners/thanthwe-logo.png",
    alt: "Thanthwe Farms",
    href: "#",
    name: "Thanthwe Farms",
  },
  {
    src: "/images/partners/chiyembekezo-logo.png",
    alt: "Chiyembekezo Foundation",
    href: "#",
    name: "Chiyembekezo Foundation",
  },
  {
    src: "/images/partners/havilah-logo.png",
    alt: "Havilah",
    href: "#",
    name: "Havilah",
  },
]

export function PartnersClients() {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <section className="py-32 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <div className="container">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Our Partners & Clients</h2>
        <p className="text-lg text-gray-300 mb-16 text-center">
          Proudly collaborating with innovative brands and businesses.
        </p>

        <div className="relative max-w-7xl mx-auto">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>

          <div
            className="overflow-hidden mx-6"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className={cn("partners-slider-fast", isPaused && "paused")}>
              {/* First set of logos */}
              {logos.map((logo, index) => (
                <div key={`first-${index}`} className="flex-shrink-0 px-12">
                  <Link href={logo.href} className="block">
                    <div className="h-52 flex items-center justify-center transition-all duration-300 hover:scale-110 min-w-[320px]">
                      <Image
                        src={logo.src || "/placeholder.svg"}
                        alt={logo.alt}
                        width={300}
                        height={180}
                        className="h-40 w-auto object-contain transition-all duration-300 hover:brightness-110 drop-shadow-xl"
                        priority={index < 3}
                      />
                    </div>
                  </Link>
                </div>
              ))}

              {/* Duplicated set for infinite effect */}
              {logos.map((logo, index) => (
                <div key={`second-${index}`} className="flex-shrink-0 px-12">
                  <Link href={logo.href} className="block">
                    <div className="h-52 flex items-center justify-center transition-all duration-300 hover:scale-110 min-w-[320px]">
                      <Image
                        src={logo.src || "/placeholder.svg"}
                        alt={logo.alt}
                        width={300}
                        height={180}
                        className="h-40 w-auto object-contain transition-all duration-300 hover:brightness-110 drop-shadow-xl"
                      />
                    </div>
                  </Link>
                </div>
              ))}

              {/* Third set for seamless infinite loop */}
              {logos.map((logo, index) => (
                <div key={`third-${index}`} className="flex-shrink-0 px-12">
                  <Link href={logo.href} className="block">
                    <div className="h-52 flex items-center justify-center transition-all duration-300 hover:scale-110 min-w-[320px]">
                      <Image
                        src={logo.src || "/placeholder.svg"}
                        alt={logo.alt}
                        width={300}
                        height={180}
                        className="h-40 w-auto object-contain transition-all duration-300 hover:brightness-110 drop-shadow-xl"
                      />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
