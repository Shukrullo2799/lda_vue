// generate-components-dts.js
import fs from 'fs'
import path from 'path'

const componentsDir = path.resolve('src/components/ui')
const outputFile = path.resolve('src/components.d.ts')

function pascalCase(str) {
  return str
    .replace(/[-_]+/g, ' ')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
    .replace(/\s+/g, '')
}

function generate() {
  if (!fs.existsSync(componentsDir)) {
    console.error(`❌ Papka topilmadi: ${componentsDir}`)
    process.exit(1)
  }

  const files = fs.readdirSync(componentsDir).filter((file) => file.endsWith('.vue'))

  const imports = files
    .map((file) => {
      const name = pascalCase(file.replace('.vue', ''))
      return `    Sh${name}: typeof import('@/components/ui/${file}')['default']`
    })
    .join('\n')

  const content = `// AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
declare module 'vue' {
  export interface GlobalComponents {
${imports}
  }
}

export {}
`

  fs.writeFileSync(outputFile, content, 'utf-8')
  console.log(`✅ components.d.ts yaratildi: ${outputFile}`)
}

generate()
