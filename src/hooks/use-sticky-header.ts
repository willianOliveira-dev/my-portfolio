"use client"

import * as React from "react"

interface StickyHeaderOptions {
  expandAt?: number
  collapseAt?: number
}

const DEFAULT_EXPAND_AT = 160
const DEFAULT_COLLAPSE_AT = 80

export function useStickyHeader({
  expandAt = DEFAULT_EXPAND_AT,
  collapseAt = DEFAULT_COLLAPSE_AT,
}: StickyHeaderOptions = {}) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  React.useEffect(() => {
    let animationFrame: number | undefined

    const updateState = () => {
      animationFrame = undefined
      const scrollPosition = window.scrollY

      setIsExpanded((currentState) => {
        if (!currentState && scrollPosition >= expandAt) {
          return true
        }

        if (currentState && scrollPosition <= collapseAt) {
          return false
        }

        return currentState
      })
    }

    const handleScroll = () => {
      if (animationFrame === undefined) {
        animationFrame = window.requestAnimationFrame(updateState)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    updateState()

    return () => {
      window.removeEventListener("scroll", handleScroll)

      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame)
      }
    }
  }, [collapseAt, expandAt])

  return isExpanded
}
