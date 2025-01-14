import React, {forwardRef} from 'react'

import {GetProps, getTokens, GetTokenString, styled, Tokens, useTheme, View} from '@tamagui/core'
import IcoMoon, {type IconProps as IconMoonProps} from 'react-icomoon'
import {Path, Svg} from 'react-native-svg'

import {IconName} from './IconName'
import iconSet from './selection.json'

export type {IconName}

const IconView = styled(View, {})

type IconViewProps = GetProps<typeof IconView & IconMoonProps>

export interface IconProps extends IconViewProps {
  name: IconName

  color?: IconViewProps['bg']
  size?: GetTokenString<keyof Tokens['size']> | number
}

export const Icon = forwardRef(
  ({name, size: iconSize = '$1.5', color = '$mauve11', ...props}: IconProps, ref) => {
    const theme = useTheme()

    const size = typeof iconSize === 'string' ? (getTokens().size?.[iconSize]?.val ?? 24) : iconSize

    return (
      <IconView {...props}>
        <IcoMoon
          native
          SvgComponent={Svg}
          PathComponent={Path}
          iconSet={iconSet}
          icon={name}
          size={size}
          color={theme[color as string]?.val ?? color}
        />
      </IconView>
    )
  }
)
