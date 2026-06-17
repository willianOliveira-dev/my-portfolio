"use client"

import * as React from "react"

const DEFAULT_SECTION = "home"

export function useActiveSection(sectionHrefs: readonly string[]) {
  const [activeSection, setActiveSection] = React.useState(DEFAULT_SECTION)

  React.useEffect(() => {
    const sectionIds = sectionHrefs.map((href) => href.replace("#", ""))
    const sections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => section !== null)
    const visibility = new Map<string, number>()

    if (sections.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0
          )
        }

        const visibleSection = sections.reduce<HTMLElement | null>(
          (current, section) => {
            if (!current) {
              return section
            }

            return (visibility.get(section.id) ?? 0) >
              (visibility.get(current.id) ?? 0)
              ? section
              : current
          },
          null
        )

        if (visibleSection && (visibility.get(visibleSection.id) ?? 0) > 0) {
          setActiveSection(visibleSection.id)
        }
      },
      {
        rootMargin: "-15% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.6, 0.85],
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [sectionHrefs])

  return activeSection
}
