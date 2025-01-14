import {config, fonts} from '@tamagui/config/v3'
import {createTamagui} from '@tamagui/core'

import {fontSize as fontSizeEnum} from './src/theme'
import * as themes from './src/theme/tamagui'

// Convert enum to object
const fontSize: any = Object.fromEntries(
  Object.entries(fontSizeEnum).filter(([key]) => isNaN(Number(key)))
) as Record<keyof typeof fontSize, number>

export const tamaguiConfig = createTamagui({
  ...config,
  // font
  fonts,

  themes: {
    ...themes,
    // light: {...themes.light, ...mauve, ...red, ...redA},
    // dark: {...themes.dark, ...mauveDark, ...redDark, ...redDarkA},
  },
})

export default tamaguiConfig

type Conf = typeof tamaguiConfig
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}
