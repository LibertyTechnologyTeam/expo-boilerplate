const {cyan, blue, magenta} = require('chalk')
const gradient = require('gradient-string')

const logo = [
  '                                                                                  ',
  ' ╔═══════════════════════════════════════════════════════════╗ ',
  ' ║                                                           ║ ',
  ' ║    ██╗     ██╗██████╗ ███████╗██████╗ ████████╗██╗   ██╗  ║ ',
  ' ║    ██║     ██║██╔══██╗██╔════╝██╔══██╗╚══██╔══╝╚██╗ ██╔╝  ║ ',
  ' ║    ██║     ██║██████╔╝█████╗  ██████╔╝   ██║    ╚████╔╝   ║ ',
  ' ║    ██║     ██║██╔══██╗██╔══╝  ██╔══██╗   ██║     ╚██╔╝    ║ ',
  ' ║    ███████╗██║██████╔╝███████╗██║  ██║   ██║      ██║     ║ ',
  ' ║    ╚══════╝╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝   ╚═╝      ╚═╝     ║ ',
  ' ║                                                           ║ ',
  ' ║              ███████╗██╗  ██╗██████╗  ██████╗             ║ ',
  ' ║              ██╔════╝╚██╗██╔╝██╔══██╗██╔═══██╗            ║ ',
  ' ║              █████╗   ╚███╔╝ ██████╔╝██║   ██║            ║ ',
  ' ║              ██╔══╝   ██╔██╗ ██╔═══╝ ██║   ██║            ║ ',
  ' ║              ███████╗██╔╝ ██╗██║     ╚██████╔╝            ║ ',
  ' ║              ╚══════╝╚═╝  ╚═╝╚═╝      ╚═════╝             ║ ',
  ' ║                                                           ║ ',
  ' ╚═══════════════════════════════════════════════════════════╝ ',
  '                                                                                   ',
]

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];


module.exports = {
  apply: async () => {
    console.clear();

    // Wave animation
    for (let wave = 0; wave < 2; wave++) {
      for (let frame = 0; frame < frames.length; frame++) {
        console.clear();
        logo.forEach((line, i) => {
          const delay = i * 2;
          const frameIndex = (frame + delay) % frames.length;
          process.stdout.write(cyan(frames[frameIndex] + ' ' + line + '\n'));
        });
        await sleep(80);
      }
    }

    // Final reveal with fade effect
    console.clear();
    for (let i = 0; i < logo.length; i++) {
      const currentLines = logo.slice(0, i + 1);
      const remainingSpaces = Array(logo.length - i - 1).fill('');
      console.clear();
      console.log(blue(currentLines.join('\n') + '\n' + remainingSpaces.join('\n')));
      await sleep(30);
    }

    // Final static display
    console.clear();
    console.log(cyan.bold(logo.join('\n')));

    return Promise.resolve();
  },
  name: 'printSuccess',
  promptsOptions: null
};