const fs = require('fs')

const axios = require('axios')

const output = `${process.cwd()}` + '/src/locales/common'
const instanceWhitelist = axios.create({
  // TODO: change to your own google sheet
  baseURL:
    'https://script.google.com/macros/s/AKfycbzEWzaUEhY_6Dv2VwrBwrJgO43DA3fQFdSvZ8TyYFrFFRjAkSecuXXE3vYgBlQH9mHbug/exec',
  timeout: 1000000,
  headers: {},
  params: {
    // NOTE: change to your own sheetName. EXP: Mobile, Web, ...
    sheetName: 'Mobile',
  },
})

const getUserWhitelist = async () => await instanceWhitelist.get()

const handlerLocales = async () => {
  const response = await getUserWhitelist()
  if (response) {
    const {data} = response || {}

    Object.keys(data).forEach(key => {
      const dir = `${output}/${key}.json`

      fs.writeFile(dir, JSON.stringify(data[key], null, 2), err => {
        if (err) {
          // eslint-disable-next-line no-console
          console.error(err)
        }
      })
    })
  }
}

// all in one
handlerLocales()
