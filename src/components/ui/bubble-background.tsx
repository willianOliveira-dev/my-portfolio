"use client"

import {
  useEffect,
  useId,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
} from "react"

import { cn } from "@/lib/utils"

type BubbleColors = {
  colorA?: string
  colorB?: string
  colorC?: string
  colorD?: string
  colorE?: string
  interactive?: string
}

type BubbleBackgroundProps = HTMLAttributes<HTMLDivElement> & {
  bgColorA?: string
  bgColorB?: string
  bubbleColors?: BubbleColors
  blendMode?: CSSProperties["mixBlendMode"]
  bubbleSize?: string
}

const defaultBubbleColors = {
  colorA: "220, 24, 36",
  colorB: "255, 92, 67",
  colorC: "255, 145, 77",
  colorD: "178, 28, 58",
  colorE: "255, 188, 166",
  interactive: "255, 108, 79",
} satisfies Required<BubbleColors>

export function BubbleBackground({
  bgColorA = "rgb(255, 245, 242)",
  bgColorB = "rgb(255, 255, 255)",
  bubbleColors,
  blendMode = "hard-light",
  bubbleSize = "80%",
  className,
  ...props
}: BubbleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const interactiveRef = useRef<HTMLDivElement>(null)
  const filterId = `bubble-goo-${useId().replaceAll(":", "")}`
  const colors = { ...defaultBubbleColors, ...bubbleColors }

  useEffect(() => {
    const container = containerRef.current
    const interactive = interactiveRef.current
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const canTrackPointer = window.matchMedia(
      "(any-hover: hover) and (any-pointer: fine)"
    ).matches

    if (!container || !interactive || reducedMotion || !canTrackPointer) {
      return
    }

    const activeContainer = container
    const activeInteractive = interactive
    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0
    let animationFrameId = 0

    function move() {
      currentX += (targetX - currentX) / 12
      currentY += (targetY - currentY) / 12
      activeInteractive.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      animationFrameId = requestAnimationFrame(move)
    }

    function handlePointerMove(event: PointerEvent) {
      const bounds = activeContainer.getBoundingClientRect()
      targetX = event.clientX - bounds.left - bounds.width / 2
      targetY = event.clientY - bounds.top - bounds.height / 2
    }

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    })
    animationFrameId = requestAnimationFrame(move)

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const centeredBubble = {
    height: bubbleSize,
    left: `calc(50% - ${bubbleSize} / 2)`,
    top: `calc(50% - ${bubbleSize} / 2)`,
    width: bubbleSize,
  } satisfies CSSProperties

  function bubbleGradient(color: string, opacity = 0.72): string {
    return `radial-gradient(circle at center, rgba(${color}, ${opacity}) 0%, rgba(${color}, 0) 52%)`
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 isolate overflow-hidden",
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${bgColorA}, ${bgColorB})`,
      }}
      {...props}
    >
      <svg className="absolute size-0">
        <filter id={filterId}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>

      <div
        className="bubble-filter-layer absolute inset-0 opacity-80 motion-reduce:opacity-60"
        style={{ filter: `url(#${filterId}) blur(40px)` }}
      >
        <div
          className="absolute animate-bounce-vertical transform-gpu will-change-transform motion-reduce:animate-none"
          style={{
            ...centeredBubble,
            background: bubbleGradient(colors.colorA),
            mixBlendMode: blendMode,
            transformOrigin: "center",
          }}
        />
        <div
          className="absolute animate-move-in-circle transform-gpu will-change-transform motion-reduce:animate-none"
          style={{
            ...centeredBubble,
            background: bubbleGradient(colors.colorB),
            mixBlendMode: blendMode,
            transformOrigin: "calc(50% - 24rem)",
          }}
        />
        <div
          className="absolute animate-move-in-circle-reverse transform-gpu will-change-transform motion-reduce:animate-none"
          style={{
            ...centeredBubble,
            background: bubbleGradient(colors.colorC, 0.58),
            left: `calc(38% - ${bubbleSize} / 2)`,
            mixBlendMode: blendMode,
            top: `calc(65% - ${bubbleSize} / 2)`,
            transformOrigin: "calc(50% + 20rem)",
          }}
        />
        <div
          className="absolute animate-bounce-horizontal transform-gpu will-change-transform motion-reduce:animate-none"
          style={{
            ...centeredBubble,
            background: bubbleGradient(colors.colorD, 0.62),
            mixBlendMode: blendMode,
            transformOrigin: "calc(50% - 12rem)",
          }}
        />
        <div
          className="absolute animate-move-in-circle-slow transform-gpu will-change-transform motion-reduce:animate-none"
          style={{
            background: bubbleGradient(colors.colorE, 0.48),
            height: `calc(${bubbleSize} * 1.5)`,
            left: `calc(50% - ${bubbleSize} * 0.75)`,
            mixBlendMode: blendMode,
            top: `calc(50% - ${bubbleSize} * 0.75)`,
            transformOrigin: "calc(50% - 32rem) calc(50% + 10rem)",
            width: `calc(${bubbleSize} * 1.5)`,
          }}
        />
        <div
          ref={interactiveRef}
          className="bubble-interactive absolute inset-0 scale-125 transform-gpu will-change-transform motion-reduce:hidden"
          style={{
            background: bubbleGradient(colors.interactive, 0.42),
            mixBlendMode: blendMode,
          }}
        />
      </div>
    </div>
  )
}
