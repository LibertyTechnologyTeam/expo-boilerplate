import {Dimensions} from 'react-native'

import StaticSafeAreaInsets from 'react-native-static-safe-area-insets'

const screen = Dimensions.get('screen')

export const screenSize = {
  width: screen.width,
  height: screen.height,
  halfWidth: Math.round(screen.width / 2),
  halfHeight: Math.round(screen.height / 2),
}

export enum fontSize {
  '2xs' = 10,
  xs = 12,
  sm = 13,
  base = 14,
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  true = 14, // Default value
  lg = 16,
  xl = 18,
  '2xl' = 20,
  '3xl' = 24,
  '4xl' = 32,
  '5xl' = 40,
  '6xl' = 48,
}

export enum size {
  '$0' = 0,
  '$0.25' = 2,
  '$0.5' = 4,
  '$0.75' = 8,
  '$1' = 20,
  '$1.5' = 24,
  '$2' = 28,
  '$2.5' = 32,
  '$3' = 36,
  '$3.5' = 40,
  '$4' = 44,
  '$4.5' = 48,
  '$5' = 52,
  '$5.75' = 60,
  '$6' = 64,
  '$7' = 74,
  '$8' = 84,
  '$9' = 94,
  '$10' = 104,
  '$11' = 124,
  '$12' = 144,
  '$13' = 164,
  '$14' = 184,
  '$15' = 204,
  '$16' = 224,
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  '$17' = 224,
  '$18' = 244,
  '$19' = 264,
  '$20' = 284,
}

export enum space {
  '$0' = 0,
  '$0.25' = 0.5,
  '$0.5' = 1,
  '$0.75' = 1.5,
  '$1' = 2,
  '$1.5' = 4,
  '$2' = 7,
  '$2.5' = 10,
  '$3' = 13,
  '$3.5' = 16,
  '$4' = 18,
  '$4.5' = 21,
  '$5' = 24,
  '$6' = 32,
  '$7' = 39,
  '$8' = 46,
  '$9' = 53,
  '$10' = 60,
  '$11' = 74,
  '$12' = 88,
  '$13' = 102,
  '$14' = 116,
  '$15' = 130,
  '$16' = 144,
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  '$17' = 144,
  '$18' = 158,
  '$19' = 172,
  '$20' = 186,
}

const baseSpace = space['$3.5']

export enum insets {
  bottom = StaticSafeAreaInsets.safeAreaInsetsBottom || baseSpace,

  top = StaticSafeAreaInsets.safeAreaInsetsTop,

  paddingTop = insets.top + baseSpace,

  paddingBottom = insets.bottom + baseSpace,
}
