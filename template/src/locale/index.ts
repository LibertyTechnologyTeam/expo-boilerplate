import {I18nManager} from 'react-native'

import 'dayjs/locale/km'
import 'dayjs/locale/vi'
//
import {I18n} from 'i18n-js'

import {storage} from '@/service'
import {Locale} from '@/types'

import en from './common/en.json'
import vi from './common/vi.json'

// load on demand

const {isRTL} = I18nManager

I18nManager.allowRTL(isRTL)
I18nManager.forceRTL(isRTL)

// INITIALIZE I18N
export const i18n = new I18n({
  en,
  vi,
})

export const setLocale = (locale: Locale) => {
  i18n.locale = locale
  storage.set('LOCALE', locale)
}

i18n.defaultSeparator = '_'

export const getLocale = (): Locale => (storage.getString('LOCALE') as Locale) || 'en'

export const translate = (key: TxKeyPath, options?: I18n.TranslateOptions) =>
  i18n.t(key, {defaultValue: key, ...options})

i18n.locale = getLocale()

export type TxKeyPath = keyof typeof en
