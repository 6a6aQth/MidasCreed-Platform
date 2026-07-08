import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShootingStars } from "@/components/ui/shooting-stars"
import { StarsBackground } from "@/components/ui/stars-background"

export default function ARExperiencePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated backgrounds */}
      <StarsBackground className="z-0" />
      <ShootingStars className="z-0" />
      
      <div className="flex flex-col min-h-screen relative z-10">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="container relative z-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">AR Experience</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Bring your products and ideas to life with immersive augmented reality experiences, revolutionizing
                  customer engagement and interactivity.
                </p>
              </div>
              <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/ar-experience.jpeg"
                  alt="AR Experience"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Showcase */}
        <section className="py-24">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Projects We've Delivered</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-beam overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative h-48">
                    <Image
                      src="/images/projects/ar-business-cards.jpeg"
                      alt="AR Business Cards"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="mb-2">AR Business Cards</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    AR business cards embedded with QR codes that launch 3D objects, 3D social media icons and contact
                    details when scanned.
                  </p>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-beam overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative h-48 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-4xl mb-2">🚀</div>
                      <div className="text-lg font-semibold">Coming Soon</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="mb-2">AR Innovation in Progress</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    We're currently developing cutting-edge AR solutions that will revolutionize how businesses interact with their customers.
                  </p>
                  <Button variant="outline" size="sm" disabled className="opacity-50 cursor-not-allowed">
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-beam overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative h-48 bg-gradient-to-br from-purple-600 to-pink-700 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-4xl mb-2">✨</div>
                      <div className="text-lg font-semibold">Coming Soon</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="mb-2">AR Innovation in Progress</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    We're currently developing cutting-edge AR solutions that will revolutionize how businesses interact with their customers.
                  </p>
                  <Button variant="outline" size="sm" disabled className="opacity-50 cursor-not-allowed">
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Immersive AR Experiences?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Let's discuss how AR can elevate your product presentations and customer interactions.
            </p>
            <Button asChild size="lg" className="button-glow">
              <Link href="/contact">Contact Us for More Information</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
