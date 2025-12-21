/// <reference types="vite/client" />

import type { App } from "vue"

const uiComponents = import.meta.glob("./src/components/ui/**/*.vue", { eager: true })
const formComponents = import.meta.glob("./src/components/form/**/*.vue", { eager: true })

export default function registerComponents(app: App) {
  function register(globs: Record<string, any>) {
    for (const path in globs) {
      const component = globs[path] as any
      const name = path.split("/").pop()?.replace(".vue", "") || ""
      if (component.default) {
        app.component(name, component.default)
      }
    }
  }

  register(uiComponents)
  register(formComponents)
}
