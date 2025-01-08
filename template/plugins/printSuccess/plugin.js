const chalk = require('chalk');
const { cyan, blue, magenta } = chalk;

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

// Tạo gradient colors array
const gradientColors = [
  chalk.greenBright,
  chalk.green,
  chalk.green,  
];

// Helper function để lấy màu gradient
const getGradientColor = (index, total) => {
  const position = Math.floor((index / total) * (gradientColors.length - 1));
  return gradientColors[position];
};

module.exports = {
  apply: async () => {
    console.clear();

    // Wave animation với gradient
    for (let wave = 0; wave < 2; wave++) {
      for (let frame = 0; frame < frames.length; frame++) {
        console.clear();
        logo.forEach((line, i) => {
          const color = getGradientColor(i, logo.length);
          const frameIndex = (frame + i * 2) % frames.length;
          process.stdout.write(color(frames[frameIndex] + ' ' + line + '\n'));
        });
        await sleep(80);
      }
    }

    // Final reveal với gradient fade effect
    console.clear();
    for (let i = 0; i < logo.length; i++) {
      const currentLines = logo.slice(0, i + 1);
      const remainingSpaces = Array(logo.length - i - 1).fill('');
      
      console.clear();
      currentLines.forEach((line, lineIndex) => {
        const color = getGradientColor(lineIndex, currentLines.length);
        console.log(color(line));
      });
      console.log(remainingSpaces.join('\n'));
      await sleep(30);
    }

    // Final static display với full gradient
    console.clear();
    logo.forEach((line, i) => {
      const color = getGradientColor(i, logo.length);
      console.log(color.bold(line));
    });

    return Promise.resolve();
  },
  name: 'printSuccess',
  promptsOptions: null
};