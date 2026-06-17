"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

const colorTokens = [
  "--color-name-burgundy",
  "--color-name-ruby",
  "--color-name-primary",
  "--color-name-scarlet",
  "--color-name-coral",
  "--color-name-rose",
] as const

const themeColors = colorTokens.map((token) => `var(${token})`)

type ColourfulTextProps = {
  text: string
}

export default function ColourfulText({ text }: ColourfulTextProps) {
  const shouldReduceMotion = useReducedMotion()
  const [currentColors, setCurrentColors] =
    React.useState<readonly string[]>(themeColors)
  const [cycle, setCycle] = React.useState(0)

  React.useEffect(() => {
    if (shouldReduceMotion) {
      return
    }

    const interval = setInterval(() => {
      setCurrentColors([...themeColors].sort(() => Math.random() - 0.5))
      setCycle((currentCycle) => currentCycle + 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [shouldReduceMotion])

  return (
    <span aria-label={text} className="whitespace-nowrap">
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${cycle}-${index}`}
          aria-hidden="true"
          initial={{ y: 0 }}
          animate={
            shouldReduceMotion
              ? { y: 0 }
              : {
                  y: [0, -3, 0],
                  scale: [1, 1.01, 1],
                  filter: ["blur(0px)", "blur(5px)", "blur(0px)"],
                  opacity: [1, 0.8, 1],
                }
          }
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            delay: shouldReduceMotion ? 0 : index * 0.05,
          }}
          style={{ color: currentColors[index % currentColors.length] }}
          className="inline-block whitespace-pre"
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}
