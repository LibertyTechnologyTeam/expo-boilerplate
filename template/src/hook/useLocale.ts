import {useMMKVString} from 'react-native-mmkv'

import {STORAGE_KEY} from '@/service'
import type {Locale} from '@/types'

export const useLocale = () => {
  const [locale = 'en'] = useMMKVString(STORAGE_KEY.LOCALE)

  return locale as Locale
}
