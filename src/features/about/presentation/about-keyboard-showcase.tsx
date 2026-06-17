"use client"

import { useEffect, useState } from "react"

import { Keyboard } from "@/components/ui/keyboard"

export function AboutKeyboardShowcase() {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 64rem)")

    function updateShouldRender() {
      setShouldRender(mediaQuery.matches)
    }

    updateShouldRender()
    mediaQuery.addEventListener("change", updateShouldRender)

    return () => mediaQuery.removeEventListener("change", updateShouldRender)
  }, [])

  if (!shouldRender) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-auto relative hidden min-h-120 items-center justify-center overflow-visible lg:flex"
    >
      <div className="relative flex w-full origin-center -rotate-2 items-center justify-center py-6">
        <Keyboard
          enableSound
          showPreview
          className="will-change-transform"
        />
      </div>
    </div>
  )
}
