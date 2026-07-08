"use client";
import React from "react";
import { Vortex } from "@/components/ui/vortex";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "Michael Lumanga",
    role: "Co-Founder & DevOps Lead Engineer",
    bio: "Michael leads MidasCreed's DevOps strategies, ensuring seamless integration and operational excellence across all our technology platforms.",
    image: "/images/Michael-Lumanga.png",
    linkedin: "https://www.linkedin.com/in/michaelslumanga",
  },
  {
    name: "Conrad Zidana",
    role: "Co-founder & Lead Software Engineer",
    bio: "Conrad oversees the development of our software products, ensuring they are robust, scalable, and user-friendly.",
    image: "/images/Conrad-Zidana.png",
    linkedin: "https://www.linkedin.com/in/conrad-zidana-94554b21b",
  },
  {
    name: "Zaithwa Chitsanthi",
    role: "Project Administrator",
    bio: "Zaithwa Contributes to project coordination, documentation, and stakeholder liaison to support effective delivery.",
    image: "/images/zaithwa-profile.png",
    linkedin: " https://www.linkedin.com/in/zaithwa-chitsanthi-a14332297",
  },
  {
    name: "Comfort Kaitane",
    role: "Head of Web App Development",
    bio: "Comfort's creative designs have helped numerous businesses establish strong online presences and brand identities.",
    image: "/images/Comfort-Kaitane.png",
    linkedin: "#",
  },
];

export default function MembersPage() {
  return (
    <div className="min-h-screen">
      {/* Vortex Section */}
      <Vortex 
        backgroundColor="black"
        baseHue={200}
        baseSpeed={0.3}
        rangeSpeed={0.4}
        baseRadius={1}
        rangeRadius={2}
        particleCount={500}
        containerClassName="h-screen"
      >
        <div className="flex flex-col items-center justify-center h-full text-center mt-32">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Meet the Team Behind MidasCreed
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A touch of your future today
          </p>
        </div>
      </Vortex>

      {/* Team Member Profiles */}
      <section className="relative py-24 bg-black overflow-hidden">
        {/* Animated backgrounds */}
        <StarsBackground className="z-0" />
        <ShootingStars className="z-0" />
        
        <div className="container relative z-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-beam overflow-hidden transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="relative w-40 h-40 mx-auto mb-4">
                    {/* Professional background with consistent gradient */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-900 to-gray-900"></div>

                    {/* Team member image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-[85%] h-[85%] rounded-full overflow-hidden">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover object-top"
                          sizes="160px"
                        />
                      </div>
                    </div>

                    {/* Border effect */}
                    <div className="absolute inset-0 rounded-full border-4 border-blue-400 dark:border-blue-600"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{member.bio}</p>
                  <div className="flex justify-center">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                        aria-label={`${member.name}'s LinkedIn profile`}
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-24 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Want to work with the MidasCreed team?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Get in touch with us today and let's create something amazing together!
          </p>
          <Button asChild size="lg" className="button-glow blue-gradient">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
} 