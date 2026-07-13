import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container py-12 mt-16">
      <div className="mx-auto max-w-[800px] space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About MidasCreed</h1>
          <p className="text-xl text-muted-foreground">AI Consultancy. Based in Lilongwe, Malawi.</p>

          {/* Floating Crown Image */}
          <div className="flex justify-center py-8">
            <div className="relative w-48 h-48 md:w-64 md:h-64 animate-float">
              <div className="absolute inset-0 rounded-full bg-blue-500/5 blur-3xl -z-10"></div>
              <Image
                src="/images/midas-logo.png"
                alt="MidasCreed Digital Crown"
                fill
                className="object-contain drop-shadow-[0_0_15px_rgba(0,98,255,0.2)]"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Who We Are</h2>
          <p className="text-muted-foreground">
            MidasCreed is an AI consultancy based in Lilongwe, Malawi, helping businesses adopt AI deliberately — starting with a single automated workflow, built to actually keep working.
          </p>
          <p className="text-muted-foreground">
            Most companies hear about AI constantly and still don't know where it belongs in their own operations. We start with an audit: mapping a business's real, repetitive workflows to find the one automation with the most value for the least effort. Then we build it — a working AI agent, deployed and maintained, not a proof of concept that gets shelved.
          </p>
          <p className="text-muted-foreground">
            Founded in 2023, MidasCreed works with businesses across Malawi, the wider African region, and internationally — applying the same structured approach regardless of scale.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Why Choose Us</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold">No Hype, Just Execution</h3>
                <p className="text-sm text-muted-foreground">We don't sell AI strategy decks. Every engagement starts with a working audit and ends with something real deployed and running — not a proposal.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold">Built Into How You Already Work</h3>
                <p className="text-sm text-muted-foreground">Agents connect to the tools you already use — your inbox, CRM, spreadsheets — instead of asking your team to learn something new.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold">Maintained, Not Abandoned</h3>
                <p className="text-sm text-muted-foreground">An agent that breaks silently is worse than no agent. We monitor, fix, and extend what we build for as long as you're a client.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold">Right-Sized for Where You Are</h3>
                <p className="text-sm text-muted-foreground">Whether you're a five-person business automating your first workflow or a larger organization scaling AI across departments, the approach is the same structured process — scaled to fit.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Leaders</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Joshua Phiri"
                    width={100}
                    height={100}
                    className="mx-auto rounded-full"
                  />
                  <h3 className="mt-4 font-semibold">Joshua Phiri</h3>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Mallick Mnela"
                    width={100}
                    height={100}
                    className="mx-auto rounded-full"
                  />
                  <h3 className="mt-4 font-semibold">Mallick Mnela</h3>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="To Be Announced"
                    width={100}
                    height={100}
                    className="mx-auto rounded-full opacity-50"
                  />
                  <h3 className="mt-4 font-semibold text-gray-500">TBA</h3>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
