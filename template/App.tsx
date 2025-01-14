import {useEffect} from 'react'

import {LogBox, UIManager, useColorScheme} from 'react-native'

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native'
import {FontLanguage, TamaguiProvider, Theme} from '@tamagui/core'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {getLocales} from 'expo-localization'
import * as SplashScreen from 'expo-splash-screen'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {KeyboardProvider} from 'react-native-keyboard-controller'
import {SafeAreaProvider} from 'react-native-safe-area-context'

import {IS_ANDROID} from '@/common'
import {useLocale} from '@/hook'
import {setLocale} from '@/locale'
import Root from '@/navigation/Root'
import {storage} from '@/service'

import tamaguiConfig from './tamagui.config'
import { Locale } from '@/types'

LogBox.ignoreLogs(['Please pass alt prop to Image component'])
LogBox.ignoreAllLogs()

dayjs.extend(relativeTime)
SplashScreen.preventAutoHideAsync()

if (IS_ANDROID && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

// if (__DEV__) {
//   require('./ReactotronConfig')
// }

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const locale = useLocale()

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <KeyboardProvider>
          <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme ?? 'light'}>
            <Theme name={colorScheme}>
              <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <BottomSheetModalProvider>
                  <FontLanguage body={locale} heading={locale}>
                    <Root colorScheme={colorScheme} />
                  </FontLanguage>
                </BottomSheetModalProvider>
              </ThemeProvider>
            </Theme>
          </TamaguiProvider>
          <Bootstrap />
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

function Bootstrap() {
  useEffect(() => {
    bootstrap()
  }, [])

  const bootstrap = async () => {
    try {
      if (!storage.getBoolean('OLD_USER')) {
        const locale = getLocales()?.[0]?.languageCode ?? 'en'
        if (locale !== 'en') setLocale(locale as Locale)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    } finally {
      SplashScreen.hideAsync()
    }
  }

  return null
}
