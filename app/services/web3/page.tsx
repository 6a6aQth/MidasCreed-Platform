import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShootingStars } from "@/components/ui/shooting-stars"
import { StarsBackground } from "@/components/ui/stars-background"

export default function Web3IntegrationPage() {
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
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Web3 Integration</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Transform your business into the decentralized future with blockchain technology, tokenization, and
                  smart contract solutions designed for security and scalability.
                </p>
              </div>
              <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
                <Image
                  src="/images/web3-integration.jpeg"
                  alt="Web3 Integration"
                  fill
                  className="object-cover rounded-lg shadow-xl"
                />
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
                    <Image src="/images/activerse-project.jpeg" alt="Activerse Project" fill className="object-cover" />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="mb-2">Activerse</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    A phygital Web3 platform connecting real-world sustainable actions to NFT rewards. Users can claim SDG
                    achievements by scanning QR codes at community events, promoting environmental responsibility through
                    blockchain technology.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://activerse.midascreed.com/" target="_blank" rel="noopener noreferrer">
                      Learn More
                    </a>
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-beam overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative h-48">
                    <Image
                      src="/images/projects/aunamex.png"
                      alt="Aunamex Project"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="mb-2">Aunamex</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    A platform that acts as a gateway to blockchain-powered property investment. Access institutional-grade Build-to-Rent assets through tokenized ownership with transparent yields and instant liquidity.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://aunamex.midascreed.com/" target="_blank" rel="noopener noreferrer">
                      Learn More
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Embrace Web3 Technology?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Let's explore how Web3 integration can revolutionize your business model and enhance security.
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
