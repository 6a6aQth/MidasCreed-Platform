"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"

const testimonials = [
  {
    quote:
      "MidasCreed built a seamless booking and payment system that completely streamlined how we manage clients and services. The platform is intuitive, fast, and beautifully executed.",
    author: "Lauryn Lambat",
    company: "Lauryn Luxe Beauty Studio",
    img: "https://avatar.vercel.sh/lauryn",
  },
  {
    quote:
      "The GreenHouse Solutions platform developed by MidasCreed has made it easy for customers to explore our offerings, request quotations, and generate invoices efficiently. Their work was both strategic and reliable.",
    author: "Dziko Chatata",
    company: "GreenHouse Solutions",
    img: "https://avatar.vercel.sh/dziko",
  },
  {
    quote:
      "MidasCreed successfully rebuilt our website with a modern, professional feel that reflects our brand. The new platform has improved our online presence and client engagement significantly.",
    author: "Sarah Uwayo",
    company: "Nirvana Tours & Travel",
    img: "https://avatar.vercel.sh/sarah",
  },
  {
    quote:
      "They handled a complex data migration project for us with precision and care. The transition was smooth, secure, and completed with minimal disruption to our operations.",
    author: "Lincoln Bailey",
    company: "Mchenga Core Mine",
    img: "https://avatar.vercel.sh/lincoln",
  },
  {
    quote:
      "MidasCreed delivered a robust application and donation platform that supports our mission effectively. The system is easy to manage and has improved how we engage with donors and applicants.",
    author: "Tanya",
    company: "Chiyembekezo Scholar Foundation",
    img: "https://avatar.vercel.sh/tanya",
  },
  {
    quote:
      "Their email setup and management services brought structure and professionalism to our communications. Everything was configured securely and works exactly as we needed.",
    author: "Stamford Nsona",
    company: "Kay Consult",
    img: "https://avatar.vercel.sh/stamford",
  },
]

const firstRow = testimonials.slice(0, 3)
const secondRow = testimonials.slice(3)

const TestimonialCard = ({
  img,
  author,
  company,
  quote,
}: {
  img: string
  author: string
  company: string
  quote: string
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-80 cursor-pointer overflow-hidden rounded-xl border p-6 mx-4",
        "border-gray-50/[.1] bg-gray-800/30 hover:bg-gray-700/50 backdrop-blur-sm transition-all duration-300",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <Image className="rounded-full" width="40" height="40" alt={author} src={img || "/placeholder.svg"} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-white">{author}</figcaption>
          <p className="text-xs font-medium text-white/60">{company}</p>
        </div>
      </div>
      <blockquote className="mt-4 text-sm text-gray-300">{quote}</blockquote>
    </figure>
  )
}

export function TestimonialMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-6">
      {/* First Row - Moving Left */}
      <div className="group flex overflow-hidden w-full [--gap:1rem]">
        <div className="flex testimonial-slider-left shrink-0 gap-[--gap] py-4 group-hover:[animation-play-state:paused]">
          {/* First set */}
          {firstRow.map((testimonial) => (
            <TestimonialCard
              key={testimonial.author}
              img={testimonial.img}
              author={testimonial.author}
              company={testimonial.company}
              quote={testimonial.quote}
            />
          ))}
          {/* Second set */}
          {firstRow.map((testimonial) => (
            <TestimonialCard
              key={`${testimonial.author}-copy-1`}
              img={testimonial.img}
              author={testimonial.author}
              company={testimonial.company}
              quote={testimonial.quote}
            />
          ))}
          {/* Third set for seamless loop */}
          {firstRow.map((testimonial) => (
            <TestimonialCard
              key={`${testimonial.author}-copy-2`}
              img={testimonial.img}
              author={testimonial.author}
              company={testimonial.company}
              quote={testimonial.quote}
            />
          ))}
        </div>
      </div>

      {/* Second Row - Moving Right */}
      <div className="group flex overflow-hidden w-full [--gap:1rem]">
        <div className="flex testimonial-slider-right shrink-0 gap-[--gap] py-4 group-hover:[animation-play-state:paused]">
          {/* First set */}
          {secondRow.map((testimonial) => (
            <TestimonialCard
              key={testimonial.author}
              img={testimonial.img}
              author={testimonial.author}
              company={testimonial.company}
              quote={testimonial.quote}
            />
          ))}
          {/* Second set */}
          {secondRow.map((testimonial) => (
            <TestimonialCard
              key={`${testimonial.author}-copy-1`}
              img={testimonial.img}
              author={testimonial.author}
              company={testimonial.company}
              quote={testimonial.quote}
            />
          ))}
          {/* Third set for seamless loop */}
          {secondRow.map((testimonial) => (
            <TestimonialCard
              key={`${testimonial.author}-copy-2`}
              img={testimonial.img}
              author={testimonial.author}
              company={testimonial.company}
              quote={testimonial.quote}
            />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black"></div>
    </div>
  )
}
