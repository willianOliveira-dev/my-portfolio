import type { ReactNode } from "react"

export interface TimelineEntry {
  id: string
  title: string
  content: ReactNode
}

export interface TimelineProps {
  data: readonly TimelineEntry[]
  className?: string
}
