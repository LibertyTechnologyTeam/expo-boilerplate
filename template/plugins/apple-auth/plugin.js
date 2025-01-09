const prompts = require('prompts')
const fs = require('fs')
const path = require('path')
const {Auth, Teams, JsonFileCache} = require('@expo/apple-utils')

module.exports = {
  apply: async (value, response) => {
    try {
      const cachePath = JsonFileCache.usernameCachePath()
      const cache = await JsonFileCache.getCacheAsync(cachePath)
      const userName = cache?.username ?? 'hi@example.com'

      const credentials = await prompts([
        {
          type: 'text',
          name: 'appleId',
          message: 'What is your Apple ID?',
          initial: userName ?? undefined,
          validate: value => (value.includes('@') ? true : 'Please enter a valid email'),
        },
      ])

      let auth = await Auth.loginAsync({
        username: credentials.appleId,
      })

      let teamId = auth.context?.teamId

      if (!teamId) {
        const teams = await Teams.getTeamsAsync()

        teamId = await prompts({
          type: 'select',
          name: 'teamId',
          message: 'Select your Apple Team:',
          choices: teams.map(team => ({
            title: `${team.name} (${team.teamId})`,
            value: team.teamId,
          })),
        })
      }

      if (teamId) {
        const configPaths = [
          path.join(process.cwd(), 'app.config.js'),
          path.join(process.cwd(), 'fastlane', 'Fastfile'),
          path.join(process.cwd(), 'fastlane', 'Matchfile'),
        ]

        configPaths.forEach(configPath => {
          if (fs.existsSync(configPath)) {
            let content = fs.readFileSync(configPath, 'utf8')
            content = content.replace(/APPLE_TEAM_ID/g, teamId)
            fs.writeFileSync(configPath, content, 'utf8')
          }
        })
      }
      return Promise.resolve()
    } catch (error) {
      throw error
    }
  },

  name: 'appleAuth',
  description: 'Configure Apple Developer account credentials',
  promptsOptions: null,
}
