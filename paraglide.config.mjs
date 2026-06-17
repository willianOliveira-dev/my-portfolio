import { compile } from "@inlang/paraglide-js"

await compile({
  project: "./project.inlang",
  outdir: "./src/paraglide",
  strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
  emitTsDeclarations: true,
  emitGitIgnore: false,
  urlPatterns: [
    {
      pattern: ":protocol://:domain(.*)::port?/:path(.*)?",
      localized: [
        ["pt-br", ":protocol://:domain(.*)::port?/pt-br/:path(.*)?"],
        ["en", ":protocol://:domain(.*)::port?/en/:path(.*)?"],
        ["es", ":protocol://:domain(.*)::port?/es/:path(.*)?"],
      ],
    },
  ],
})
