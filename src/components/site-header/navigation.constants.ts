import {
  navigation_about,
  navigation_contact,
  navigation_home,
  navigation_projects,
  navigation_faq,
  navigation_story,
} from "@/paraglide/messages"

export const navigationItems = [
  { href: "#home", message: navigation_home },
  { href: "#about", message: navigation_about },
  { href: "#journey", message: navigation_story },
  { href: "#projects", message: navigation_projects },
  { href: "#contact", message: navigation_contact },
  { href: "#faq", message: navigation_faq },
] as const

export const navigationHrefs = navigationItems.map((item) => item.href)
