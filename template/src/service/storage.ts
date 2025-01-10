import {MMKV} from 'react-native-mmkv'

const mmkv = new MMKV()

export enum STORAGE_KEY {
  LOCALE = 'LOCALE',
  OLD_USER = 'OLD_USER',
  FCM_TOKEN = 'FCM_TOKEN',
  THEME = 'THEME',
}

type KEY = keyof typeof STORAGE_KEY

function setObject(name: KEY, value: unknown) {
  mmkv.set(name, JSON.stringify(value))
}

function getObject(name: KEY, defaultValue?: unknown) {
  try {
    if (mmkv.contains(name)) {
      const value = mmkv.getString(name)
      if (value) return JSON.parse(value)
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Get Storage Error: ', e)
  }
  return defaultValue
}

declare module 'react-native-mmkv' {
  interface MMKV {
    setObject: typeof setObject
    getObject: typeof getObject
  }
}

export type Storage = MMKV & {
  set: (key: KEY, value: boolean | string | number | ArrayBuffer) => void
  getString: (key: KEY) => string | undefined
  getBoolean: (key: KEY) => boolean | undefined
  getNumber: (key: KEY) => number | undefined
  getBuffer: (key: KEY) => ArrayBuffer | undefined
  contains: (key: KEY) => boolean
  delete: (key: KEY) => void
}

export default Object.assign(mmkv, {
  setObject,
  getObject,
}) as Storage
