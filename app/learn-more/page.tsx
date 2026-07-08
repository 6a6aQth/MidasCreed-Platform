import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Brain, Boxes, Glasses, Globe, Zap, Users, Shield, BarChart } from "lucide-react"
import { TestimonialMarquee } from "@/components/testimonial-marquee"
import { cn } from "@/lib/utils"

const services = [
  {
    title: "Artificial Intelligence",
    description:
      "Harness the power of artificial intelligence and modern web technologies to create intelligent, responsive, and user-friendly digital solutions tailored to your specific business needs.",
    icon: Brain,
    href: "/services/ai",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    title: "Blockchain & Web3",
    description:
      "Step into the future of decentralized technology with our Web3 expertise. We help businesses implement blockchain solutions, smart contracts, and decentralized applications.",
    icon: Boxes,
    href: "/services/web3",
    gradient: "from-indigo-500 to-blue-700",
  },
  {
    title: "Augmented and Virtual Reality",
    description:
      "Transform customer experiences with immersive augmented and virtual reality applications that bring your products and services to life in revolutionary ways.",
    icon: Glasses,
    href: "/services/ar",
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    title: "Business Automation",
    description:
      "Streamline your operations with custom automation solutions that reduce manual tasks, minimize errors, and allow your team to focus on high-value activities.",
    icon: Globe,
    href: "/services/web-design",
    gradient: "from-sky-500 to-blue-600",
  },
]

const advantages = [
  {
    title: "Expert Team",
    description:
      "Our specialists bring years of experience in AI, blockchain, AR/VR, and web development to every project.",
    icon: Users,
  },
  {
    title: "African-Focused Solutions",
    description:
      "We understand the unique challenges and opportunities in the African market and build solutions that address local needs.",
    icon: Zap,
  },
  {
    title: "Secure & Reliable",
    description:
      "We prioritize security and reliability in all our solutions, ensuring your business operations run smoothly.",
    icon: Shield,
  },
  {
    title: "Data-Driven Approach",
    description:
      "Our solutions are built on solid data analysis, ensuring measurable results and continuous improvement.",
    icon: BarChart,
  },
]

const faqs = [
  {
    question: "How do I get started with MidasCreed?",
    answer:
      "Getting started is easy! Simply reach out to us through our contact form, and one of our consultants will schedule a free discovery call to understand your needs and discuss how we can help your business grow.",
  },
  {
    question: "Do you work with startups and small businesses?",
    answer:
      "We're passionate about helping businesses of all sizes. We offer scalable solutions that can grow with your business, and we tailor our approach to fit your budget and specific requirements.",
  },
  {
    question: "What industries do you serve?",
    answer:
      "We work across various industries including finance, healthcare, education, retail, agriculture, and more. Our diverse expertise allows us to bring innovative solutions to any sector looking to leverage technology for growth.",
  },
  {
    question: "How long does it typically take to complete a project?",
    answer:
      "Project timelines vary depending on complexity and scope. A simple web application might take 4-6 weeks, while more complex AI or blockchain solutions could take 3-6 months. We'll provide a detailed timeline during our initial consultation.",
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer:
      "Yes, we offer various support and maintenance packages to ensure your solution continues to perform optimally. We can also provide training for your team and implement updates as your business evolves.",
  },
  {
    question: "Can you integrate with our existing systems?",
    answer:
      "Yes, we specialize in creating solutions that integrate seamlessly with your existing infrastructure. Our team has experience working with a wide range of technologies and can develop custom integrations as needed.",
  },
]

export default function LearnMorePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Who We Are Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900" />
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-6"></h1>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg">
                  MidasCreed is a forward-thinking technology company based in Malawi, dedicated to transforming
                  businesses across Africa through innovative digital solutions. Our mission is to bridge the technology
                  gap and empower local businesses to compete on a global scale.
                </p>
                <p>
                  Founded by a team of passionate tech enthusiasts with extensive experience in AI, blockchain, and web
                  development, we combine cutting-edge technology with deep understanding of local markets to create
                  solutions that drive real business growth.
                </p>
                <p>
                  Just as the mythical King Midas turned everything he touched to gold, we aim to transform every
                  project into digital excellence, creating lasting value for our clients and communities.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-64 h-64 lg:w-96 lg:h-96 animate-float">
                <div className="absolute inset-0 rounded-full bg-blue-500/5 blur-3xl -z-10"></div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/midas3d-aB4nmmm6YFPfPi1L1jJsofnlkn3mai.png"
                  alt="MidasCreed Digital Crown"
                  fill
                  className="object-contain drop-shadow-[0_0_15px_rgba(0,98,255,0.2)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section - New Design */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black" />
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">What We Do</h2>
            <p className="text-gray-300">
              We offer a comprehensive suite of technology services designed to help businesses innovate, grow, and
              thrive in the digital economy.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <Link key={service.title} href={service.href} className="group relative overflow-hidden rounded-2xl">
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-20 transition-opacity duration-300 group-hover:opacity-30",
                      service.gradient,
                    )}
                  />
                  <div className="relative p-8 bg-gray-900/60 backdrop-blur-sm transition-colors duration-300 group-hover:bg-gray-900/70">
                    <div className="flex items-start gap-6">
                      <div
                        className={cn(
                          "flex-shrink-0 w-12 h-12 rounded-xl p-2.5 transition-colors duration-300",
                          "bg-gradient-to-br",
                          service.gradient,
                        )}
                      >
                        <IconComponent className="w-full h-full text-white" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">{service.description}</p>
                        <div className="flex items-center text-blue-400 pt-2">
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
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900" />
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Why Choose Us</h2>
            <p className="text-gray-300">
              At MidasCreed, we combine technical expertise with local insights to deliver solutions that truly make a
              difference.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((advantage) => {
              const IconComponent = advantage.icon
              return (
                <div
                  key={advantage.title}
                  className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 transition-all duration-300 hover:bg-gray-700/30 hover:border-gray-600/50"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{advantage.title}</h3>
                    <p className="text-gray-400 text-sm">{advantage.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Client Success Stories / Testimonials */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black" />
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Client Success Stories</h2>
            <p className="text-gray-300">
              Don't just take our word for it. Here's what our clients have to say about working with MidasCreed.
            </p>
          </div>

          <TestimonialMarquee />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0062ff_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
              Ready to take your business to the next level?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Let's discuss how our innovative solutions can help you achieve your business goals.
            </p>
            <Button asChild size="lg" className="blue-gradient button-glow rounded-full text-primary-foreground">
              <Link href="/contact">Book a Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black" />
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-300">Find answers to common questions about working with MidasCreed.</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-gray-700/50 rounded-lg overflow-hidden bg-gray-800/30 backdrop-blur-sm"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-700/30 transition-all duration-200 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-300">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  )
}
