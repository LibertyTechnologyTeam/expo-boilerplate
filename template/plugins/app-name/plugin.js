const fs = require('fs')
const path = require('path')

module.exports = {
  apply: async (value, response) => {
    // get project name from process.argv or current directory
    const projectName = process.argv[2] || path.basename(process.cwd())

    if (projectName) {
      const configPaths = [
        path.join(process.cwd(), 'app.config.js'),
        path.join(process.cwd(), 'fastlane', 'Fastfile'),
        path.join(process.cwd(), 'fastlane', 'Matchfile'),
      ]

      try {
        configPaths.forEach(configPath => {
          if (fs.existsSync(configPath)) {
            let content = fs.readFileSync(configPath, 'utf8')
            content = content.replace(/PROJECT_NAME/g, projectName)
            fs.writeFileSync(configPath, content, 'utf8')
          }
        })
      } catch (error) {
        throw error
      }
    }
    return Promise.resolve()
  },
  name: 'appName',
  // Không cần promptsOptions vì lấy tên từ CLI
  promptsOptions: null,
}
