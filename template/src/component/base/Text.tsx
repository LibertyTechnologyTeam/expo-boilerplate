import React from 'react'

import {FontLanguage, GetProps, styled, Text as TamaguiText} from '@tamagui/core'

import {fontSize} from '@/theme'
import {Locale} from '@/types'

const RNText = styled(TamaguiText, {
  color: '$color',

  variants: {
    fontSize: (size, {props}) => {
      const val = fontSize[(size as any)?.replace?.('$', '')] ?? size

      if (typeof val === 'number') {
        return {
          fontSize: val,
          lineHeight: val * 1.5,
        }
      } else {
        //
      }
    },
  } as const,

  defaultVariants: {
    fontSize: '$true',
  },
})

interface TextProps extends GetProps<typeof RNText> {
  language?: Locale
}

export function Text({children = '', language, ...props}: TextProps) {
  if (language) {
    return (
      <FontLanguage body={language}>
        <RNText {...props}>{children}</RNText>
      </FontLanguage>
    )
  }
  return <RNText {...props}>{children}</RNText>
}
