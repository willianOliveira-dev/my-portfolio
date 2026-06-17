import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import type { StoryMilestone } from "../story.types"

interface StoryMilestoneCardProps {
  milestone: StoryMilestone
}

export function StoryMilestoneCard({
  milestone,
}: StoryMilestoneCardProps) {
  return (
    <Card
      size="lg"
      tone="inverse"
      className="max-w-xl transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <CardHeader>
        <CardTitle>{milestone.title}</CardTitle>
        <CardDescription>{milestone.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {milestone.technologies.map((technology) => (
          <Badge key={technology} variant="inverse">
            {technology}
          </Badge>
        ))}
      </CardContent>
    </Card>
  )
}
