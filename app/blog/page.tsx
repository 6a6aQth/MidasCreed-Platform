"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

const blogData = [
  {
    src: "/placeholder.svg?height=400&width=600",
    title: "Understanding the AI Adoption Framework: From Audit to Infrastructure",
    category: "Framework",
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
          A plain-language walkthrough of the four tracks of AI adoption, written for business owners.
        </p>
        <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300 italic">
          Full post coming soon.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
            Strategy
          </span>
          <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full dark:bg-green-900 dark:text-green-200">
            Adoption
          </span>
        </div>
      </div>
    ),
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    title: "How an AI Audit Actually Works",
    category: "How We Work",
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
          What a client should expect from a first conversation, and why we start with mapping your operations instead of selling strategy decks.
        </p>
        <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300 italic">
          Full post coming soon.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
            Process
          </span>
          <span className="px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-full dark:bg-purple-900 dark:text-purple-200">
            Audit
          </span>
        </div>
      </div>
    ),
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    title: "Automating Dispatch: A Real Build Breakdown",
    category: "Case Study",
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
          A specific, unglamorous look at what a workflow looked like before our intervention and what runs on its own now.
        </p>
        <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300 italic">
          Full post coming soon.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full dark:bg-green-900 dark:text-green-200">
            Case Study
          </span>
          <span className="px-3 py-1 text-sm bg-orange-100 text-orange-800 rounded-full dark:bg-orange-900 dark:text-orange-200">
            Integration
          </span>
        </div>
      </div>
    ),
  },
];

export default function BlogPage() {
  const carouselItems = blogData.map((blog, index) => (
    <Card key={index} card={blog} index={index} />
  ));

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated backgrounds */}
      <StarsBackground className="z-0" />
      <ShootingStars className="z-0" />

      <div className="container py-8 mt-16 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">

          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Exploring the intersection of technology, innovation, and human potential.
            Discover insights, breakthroughs, and stories from the forefront of AI and digital transformation.
          </p>
        </div>

        <Carousel items={carouselItems} />
      </div>
    </div>
  );
} 