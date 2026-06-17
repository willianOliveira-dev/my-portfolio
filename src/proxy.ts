import { NextResponse, type NextRequest } from "next/server"

import { locales, localizeUrl } from "@/paraglide/runtime"
import { paraglideMiddleware } from "@/paraglide/server"

export function proxy(request: NextRequest) {
  if (request.headers.get("x-paraglide-rewrite") === "1") {
    return NextResponse.next()
  }

  return paraglideMiddleware(request, ({ request: localizedRequest, locale }) => {
    const firstPathSegment = request.nextUrl.pathname.split("/")[1]
    const hasLocalePrefix = locales.some(
      (supportedLocale) => supportedLocale === firstPathSegment
    )

    if (!hasLocalePrefix) {
      return NextResponse.redirect(
        localizeUrl(request.url, { locale }).toString()
      )
    }

    const requestHeaders = new Headers(localizedRequest.headers)
    requestHeaders.set("x-paraglide-locale", locale)
    requestHeaders.set("x-paraglide-rewrite", "1")

    return NextResponse.rewrite(localizedRequest.url, {
      request: {
        headers: requestHeaders,
      },
    })
  })
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
}
