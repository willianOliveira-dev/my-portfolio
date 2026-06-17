"use client"

import { Timeline } from "@/components/ui/timeline"
import { useCurrentLocale } from "@/hooks/use-current-locale"
import { story_intro, story_title } from "@/paraglide/messages"

import { getStoryMilestones } from "../story.data"
import { StoryMilestoneCard } from "./story-milestone-card"

export function StorySection() {
  const { locale } = useCurrentLocale()
  const title = story_title({}, { locale })
  const milestones = getStoryMilestones(locale)
  const timelineData = milestones.map((milestone) => ({
    id: milestone.id,
    title: milestone.period,
    content: <StoryMilestoneCard milestone={milestone} />,
  }))

  return (
    <section
      id="journey"
      aria-labelledby="story-title"
      className="relative isolate overflow-hidden scroll-mt-28 bg-background px-4 py-20 sm:px-6 sm:py-24 lg:px-8 dark:bg-black"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-background via-background/72 to-primary/8 dark:from-black dark:via-black/82 dark:to-primary/10"
      />
      <div className="mx-auto max-w-7xl">
        <header className="relative z-10 max-w-3xl">
          <h2
            id="story-title"
            className="font-heading text-5xl font-bold leading-none tracking-tight text-foreground sm:text-7xl lg:text-8xl"
          >
            {title}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {story_intro({}, { locale })}
          </p>
        </header>

        <Timeline data={timelineData} className="mt-12 sm:mt-16" />
      </div>
    </section>
  )
}
