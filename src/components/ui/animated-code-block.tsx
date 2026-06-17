"use client"

import { useEffect, useMemo, useState } from "react"

import { cn } from "@/lib/utils"

const codeThemeClasses = {
  dark: "bg-code-nightowl text-code-foreground",
  terminal: "bg-code-terminal text-code-terminal-foreground",
  cyberpunk: "bg-code-cyberpunk text-code-foreground",
  nightowl: "bg-code-nightowl text-code-foreground",
} as const

const csharpKeywords = new Set([
  "class",
  "namespace",
  "public",
  "return",
  "static",
  "using",
  "void",
])

const csharpTypes = new Set([
  "Console",
  "Program",
  "String",
  "System",
  "string",
])

const csharpMethods = new Set(["Main", "WriteLine"])

type CodeToken = {
  content: string
  type: "comment" | "keyword" | "method" | "number" | "plain" | "string" | "type"
}

function tokenizeCsharpLine(line: string): CodeToken[] {
  const tokens =
    line.match(
      /\/\/.*|"(?:\\.|[^"\\])*"?|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*\b|[^A-Za-z0-9_"]+/g
    ) ?? []

  return tokens.map((content) => {
    if (content.startsWith("//")) {
      return { content, type: "comment" }
    }

    if (content.startsWith('"')) {
      return { content, type: "string" }
    }

    if (/^\d/.test(content)) {
      return { content, type: "number" }
    }

    if (csharpKeywords.has(content)) {
      return { content, type: "keyword" }
    }

    if (csharpTypes.has(content)) {
      return { content, type: "type" }
    }

    if (csharpMethods.has(content)) {
      return { content, type: "method" }
    }

    return { content, type: "plain" }
  })
}

function getTokenClassName(type: CodeToken["type"]): string {
  switch (type) {
    case "comment":
      return "text-code-comment"
    case "keyword":
      return "text-code-keyword"
    case "method":
      return "text-code-method"
    case "number":
      return "text-code-number"
    case "string":
      return "text-code-string"
    case "type":
      return "text-code-type"
    case "plain":
      return ""
  }
}

type AnimatedCodeBlockProps = {
  code: string
  language?: string
  theme?: "dark" | "terminal" | "cyberpunk" | "nightowl"
  typingSpeed?: number
  showLineNumbers?: boolean
  highlightLines?: number[]
  title?: string
  className?: string
  autoPlay?: boolean
  loop?: boolean
  blurEffect?: boolean
  showControls?: boolean
  onCopy?: () => void
}

export function AnimatedCodeBlock({
  code,
  language = "typescript",
  theme = "dark",
  typingSpeed = 28,
  showLineNumbers = true,
  highlightLines = [],
  title = "portfolio.ts",
  className,
  autoPlay = true,
  loop = true,
}: AnimatedCodeBlockProps) {
  const [position, setPosition] = useState(autoPlay ? 0 : code.length)

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (!autoPlay) {
      return
    }

    if (reducedMotion) {
      const timeoutId = window.setTimeout(() => setPosition(code.length), 0)
      return () => window.clearTimeout(timeoutId)
    }

    const intervalId = window.setInterval(() => {
      setPosition((currentPosition) => {
        if (currentPosition >= code.length) {
          return loop ? 0 : code.length
        }

        return currentPosition + 1
      })
    }, typingSpeed)

    return () => window.clearInterval(intervalId)
  }, [autoPlay, code.length, loop, typingSpeed])

  const visibleLines = useMemo(
    () => code.slice(0, position).split("\n"),
    [code, position]
  )

  return (
    <div
      className={cn(
        "flex h-full min-h-0 flex-col overflow-hidden font-mono",
        codeThemeClasses[theme],
        className
      )}
    >
      <div className="flex h-[clamp(1.125rem,4.8vw,2rem)] shrink-0 items-center gap-[clamp(0.25rem,1.2vw,0.5rem)] border-b border-code-border bg-code-header px-[clamp(0.375rem,1.8vw,0.75rem)]">
        <div aria-hidden="true" className="size-2 rounded-full bg-primary" />
        <div aria-hidden="true" className="size-2 rounded-full bg-code-control" />
        <div aria-hidden="true" className="size-2 rounded-full bg-code-control-muted" />
        <span className="ml-1 truncate text-[clamp(0.5rem,1.9vw,0.75rem)] font-medium text-code-muted">
          {title}
        </span>
        <span className="ml-auto text-[clamp(0.45rem,1.7vw,0.75rem)] uppercase text-code-subtle">
          {language}
        </span>
      </div>

      <pre
        aria-label={code}
        className="min-h-0 flex-1 overflow-hidden p-[clamp(0.375rem,1.8vw,0.75rem)] text-[clamp(0.42rem,1.7vw,0.75rem)] leading-relaxed"
      >
        <code aria-hidden="true" className="block">
          {visibleLines.map((line, index) => {
            const lineNumber = index + 1
            const isHighlighted = highlightLines.includes(lineNumber)
            const isCurrentLine =
              index === visibleLines.length - 1 && position < code.length

            return (
              <span
                key={`${lineNumber}-${line}`}
                className={cn(
                  "block min-h-[1.35em] rounded-sm px-1",
                  isHighlighted && "bg-code-highlight"
                )}
              >
                {showLineNumbers ? (
                  <span className="mr-[clamp(0.375rem,1.4vw,0.75rem)] inline-block w-[2ch] select-none text-right text-code-line-number">
                    {lineNumber}
                  </span>
                ) : null}
                <span>
                  {tokenizeCsharpLine(line).map((token, tokenIndex) => (
                    <span
                      key={`${tokenIndex}-${token.content}`}
                      className={getTokenClassName(token.type)}
                    >
                      {token.content}
                    </span>
                  ))}
                </span>
                {isCurrentLine ? (
                  <span
                    aria-hidden="true"
                    className="ml-1 inline-block h-4 w-px animate-pulse bg-code-cursor align-middle motion-reduce:animate-none"
                  />
                ) : null}
              </span>
            )
          })}
        </code>
      </pre>
    </div>
  )
}
