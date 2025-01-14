import {translate, TxKeyPath} from '@/locale'

import {useLocale} from './useLocale'

type TranslateFunction = (key: TxKeyPath, options?: I18n.TranslateOptions) => string

export function useTranslate(): TranslateFunction

export function useTranslate<T extends TxKeyPath>(key: T, txOptions?: I18n.TranslateOptions): string
export function useTranslate<T extends TxKeyPath>(
  key?: T,
  txOptions?: I18n.TranslateOptions
): string | TranslateFunction {
  const locale = useLocale()

  if (key === undefined) {
    return (k: TxKeyPath, options?: I18n.TranslateOptions) => translate(k, {...options, locale})
  }

  return translate(key, {
    ...txOptions,
    locale,
    defaultValue: key,
  })
}
