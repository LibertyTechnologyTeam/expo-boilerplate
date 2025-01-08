const {cyan, blue, magenta} = require('chalk')
const gradient = require('gradient-string')

const logo = [
  '                                                                                  ',
  '                ╔═══════════════════════════════════════════════════════════╗    ',
  '                ║                                                           ║    ',
  '                ║    ██╗     ██╗██████╗ ███████╗██████╗ ████████╗██╗   ██╗  ║    ',
  '                ║    ██║     ██║██╔══██╗██╔════╝██╔══██╗╚══██╔══╝╚██╗ ██╔╝  ║    ',
  '                ║    ██║     ██║██████╔╝█████╗  ██████╔╝   ██║    ╚████╔╝   ║    ',
  '                ║    ██║     ██║██╔══██╗██╔══╝  ██╔══██╗   ██║     ╚██╔╝    ║    ',
  '                ║    ███████╗██║██████╔╝███████╗██║  ██║   ██║      ██║     ║    ',
  '                ║    ╚══════╝╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝   ╚═╝      ╚═╝     ║    ',
  '                ║                                                           ║    ',
  '                ║              ███████╗██╗  ██╗██████╗  ██████╗             ║    ',
  '                ║              ██╔════╝╚██╗██╔╝██╔══██╗██╔═══██╗            ║    ',
  '                ║              █████╗   ╚███╔╝ ██████╔╝██║   ██║            ║    ',
  '                ║              ██╔══╝   ██╔██╗ ██╔═══╝ ██║   ██║            ║    ',
  '                ║              ███████╗██╔╝ ██╗██║     ╚██████╔╝            ║    ',
  '                ║              ╚══════╝╚═╝  ╚═╝╚═╝      ╚═════╝             ║    ',
  '                ║                                                           ║    ',
  '                ╚═══════════════════════════════════════════════════════════╝    ',
  '                                                                                   ',
]

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports = {
  apply: async () => {
    // Clear console
    console.clear()

    const colors = {
      primary: cyan,
      accent: blue,
      highlight: magenta,
    }

    // Print logo with typing effect
    for (let i = 0; i < logo.length; i++) {
      process.stdout.write(gradient(colors.start, colors.end)(logo[i] + '\n'))
      await sleep(200) // Adjust speed here
    }

    // Add shine effect
    for (let i = 0; i < 3; i++) {
      await sleep(200)
      console.clear()
      logo.forEach((line, index) => {
        if (index === i * 2) {
          console.log(cyan(line))
        } else {
          console.log(gradient(colors.start, colors.end)(line))
        }
      })
    }

    // Final display
    await sleep(200)
    console.clear()
    console.log(gradient(colors.start, colors.end)(logo.join('\n')))

    return Promise.resolve()
  },
  name: 'printSuccess',
  promptsOptions: null,
}
