import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SiteUtilityControls } from "@/components/theme/site-utility-controls"
import { AboutSection } from "@/features/about"
import { HeroSection } from "@/features/hero"
import { StorySection } from "@/features/journey"
import { ProjectsSection } from "@/features/projects"
import { ContactSection } from "@/features/contact"
import { ChatWidget } from "@/features/chat"
import { FaqSection } from "@/features/faq"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <StorySection />
        <ProjectsSection />
        <ContactSection />
        <FaqSection />
      </main>
      <SiteFooter />
      <SiteUtilityControls />
      <ChatWidget />
    </div>
  )
}
