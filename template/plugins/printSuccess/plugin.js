/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const {blue, green, red, yellow} = require('kleur')

module.exports = {
  async apply(value, previousValues) {
    return new Promise(resolve => {
      console.log('\n')
      console.log('Liberty Expo Boilerplate initialized with success ! 🚀\n')
      console.log(
        `${green(
          '                                                                                \n' +
            '                ██�     ██╗██████╗ ███████╗██████╗ ████████╗██╗   ██╗       \n' +
            '                ██║     ██║██╔══██╗██╔════╝██╔══██╗╚══██╔══╝╚██╗ ██╔╝       \n' +
            '                ██║     ██║██████╔╝█████╗  ██████╔╝   ██║    ╚████╔╝        \n' +
            '                ██║     ██║██╔══██╗██╔══╝  ██╔══██╗   ██║     ╚██╔╝         \n' +
            '                ███████╗██║██████╔╝███████╗██║  ██║   ██║      ██║          \n' +
            '                ╚══════╝╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝   ╚═╝      ╚═╝          \n' +
            '                                                                              \n' +
            '                      ███████╗██╗  ██╗██████╗  ██████╗                       \n' +
            '                      ██╔════╝╚██╗██╔╝██╔══██╗██╔═══██╗                      \n' +
            '                      █████╗   ╚███╔╝ ██████╔╝██║   ██║                      \n' +
            '                      ██╔══╝   ██╔██╗ ██╔═══╝ ██║   ██║                      \n' +
            '                      ███████╗██╔╝ ██╗██║     ╚██████╔╝                      \n' +
            '                      ╚══════╝╚═╝  ╚═╝╚═╝      ╚═════╝                       \n' +
            '                                                                              '
        )}`
      )
   
      console.log('\n')

      console.log(
        '- 📚 If you need to read more about this boilerplate : https://github.com/LibertyTechnologyTeam/expo-boilerplate'
      )
      console.log(
        '- 🤕 If you have some troubles : https://github.com/LibertyTechnologyTeam/expo-boilerplate/issues'
      )
      console.log(
        '- ⭐ If you love this boilerplate, give us a star, you will be a ray of sunshine in our lives :) https://github.com/LibertyTechnologyTeam/expo-boilerplate'
      )

      resolve()
    })
  },
}
