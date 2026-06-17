"use client"

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react"
import { useRef } from "react"

import { cn } from "@/lib/utils"

import type { TimelineProps } from "./timeline.types"

export function Timeline({ data, className }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 45%"],
  })
  const progressHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  )
  const progressOpacity = useTransform(
    scrollYProgress,
    [0, 0.08],
    [0, 1]
  )

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div
        aria-hidden="true"
        className="absolute bottom-4 left-5 top-4 w-0.5 overflow-hidden rounded-full bg-border lg:left-1/2"
      >
        <motion.div
          className="absolute inset-x-0 top-0 w-0.5 rounded-full bg-linear-to-b from-primary via-name-coral to-name-burgundy"
          style={{
            height: shouldReduceMotion ? "100%" : progressHeight,
            opacity: shouldReduceMotion ? 1 : progressOpacity,
          }}
        />
      </div>

      <ol className="relative grid gap-16 pb-8 lg:gap-24">
        {data.map((item, index) => {
          const alignRight = index % 2 !== 0

          return (
            <li
              key={item.id}
              className="relative grid min-h-48 grid-cols-1 items-center lg:grid-cols-2"
            >
              <div
                aria-hidden="true"
                className="absolute left-5 top-8 z-10 flex size-10 -translate-x-1/2 items-center justify-center rounded-full bg-background ring-1 ring-primary/20 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2"
              >
                <div className="size-3 rounded-full bg-primary shadow-lg shadow-primary/40" />
              </div>

              <div
                className={cn(
                  "mb-4 pl-14 lg:row-start-1 lg:mb-0 lg:self-center",
                  alignRight
                    ? "lg:col-start-1 lg:pl-0 lg:pr-16 lg:text-right"
                    : "lg:col-start-2 lg:pl-16"
                )}
              >
                <p className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-5xl">
                  {item.title}
                </p>
              </div>

              <div
                className={cn(
                  "w-full pl-14 lg:row-start-1",
                  alignRight
                    ? "lg:col-start-2 lg:pl-16"
                    : "lg:col-start-1 lg:justify-self-end lg:pl-0 lg:pr-16"
                )}
              >
                {item.content}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
