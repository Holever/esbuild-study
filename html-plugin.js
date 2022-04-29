const fs = require("fs/promises")
const path = require("path")
const { generateHTML, createScript, createLink } = require('./util')

module.exports = () => {
  return {
    name: 'esbuild:html',
    setup(build) {
      build.onEnd(async (buildResult) => {
        const { metafile } = buildResult
        const scripts = []
        const styles = []
        if (metafile) {
          const { outputs } = metafile
          Object.keys(outputs).forEach(asset => {
            if (asset.endsWith('.js')) {
              scripts.push(createScript(asset))
            } else if (asset.endsWith('.css')) {
              styles.push(createLink(asset))
            }
          })
          const templateContent = generateHTML(scripts, styles)
          const templatePath = path.join(process.cwd(), 'index.html')
          // const templatePath = path.join(process.cwd(), build.initialOptions?.outdir || '', 'index.html')
          await fs.writeFile(templatePath, templateContent)
        }
      })
    }
  }
}