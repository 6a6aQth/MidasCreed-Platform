import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { ShootingStars } from "@/components/ui/shooting-stars"
import { StarsBackground } from "@/components/ui/stars-background"

export default function IntegrationPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated backgrounds */}
      <StarsBackground className="z-0" />
      <ShootingStars className="z-0" />
      <div className="flex flex-col min-h-screen relative z-10">
      <div className="container py-24 mt-16 max-w-[1200px] mx-auto">
        {/* Header Section */}
        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-12 text-left">
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl border-b border-gray-800 pb-4 mb-6 text-white">
                AI Integration
              </h1>
              <p className="text-gray-400 text-lg sm:text-xl">
                For businesses with a specific, repetitive workflow worth automating. We audit it, build a working AI agent for it, and manage it as an ongoing service.
              </p>
            </div>
            <div className="relative h-64 md:h-auto rounded-xl overflow-hidden min-h-[300px]">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="AI Integration Concept"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Projects We've Delivered</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-beam overflow-hidden bg-gray-900/50">
                <CardHeader className="p-0">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt={`Integration Project ${i}`}
                      fill
                      className="object-cover grayscale opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-xl text-white">Agent Build {i}</h3>
                  <p className="text-sm text-gray-400 mb-4 h-[80px] overflow-hidden">
                    [Placeholder] A look at a deployed automation agent that integrates directly into the client's CRM to process repetitive incoming tickets.
                  </p>
                  <Button variant="outline" size="sm" asChild className="border-gray-700 bg-gray-800 text-gray-300 hover:text-white">
                    <Link href="#">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Ready to Automate?</h2>
            <p className="text-lg text-gray-400 mb-8">
              Let's find the repetitive tasks holding you back.
            </p>
            <Button asChild size="lg" className="blue-gradient">
              <Link href="/contact">Contact Us for More Information</Link>
            </Button>
          </div>
        </section>
      </div>
      </div>
    </div>
  )
}
