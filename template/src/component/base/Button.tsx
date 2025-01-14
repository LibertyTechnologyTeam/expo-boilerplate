import {GestureResponderEvent} from 'react-native'

import {GetProps, styled, Text, TextProps, View} from '@tamagui/core'

import {onHaptic} from '@/service'
import {fontSize} from '@/theme'

import {Pressable} from './Pressable'

type ButtonViewProps = GetProps<typeof ButtonView>

export interface ButtonProps extends ButtonViewProps {
  titleProps?: TextProps
  tracking?: {
    //
  }
}

export const Button = ({children = 'Button', titleProps, ...props}: ButtonProps) => {
  const onPress = (e: GestureResponderEvent) => {
    onHaptic()
    props?.onPress?.(e)
  }

  return (
    <Pressable activeOpacity={0.8} onPress={onPress}>
      <ButtonView {...props} onPress={null}>
        {typeof children === 'string' || typeof children === 'number' ? (
          <ButtonText type={props.type} size={props.size} {...titleProps}>
            {children || ''}
          </ButtonText>
        ) : (
          children
        )}
      </ButtonView>
    </Pressable>
  )
}

const ButtonView = styled(View, {
  justifyContent: 'center',
  alignItems: 'center',

  borderRadius: '$4',
  gap: '$4',
  borderWidth: 2,
  borderColor: '$colorTransparent',

  variants: {
    type: {
      plain: {
        backgroundColor: '$accentColor',
      },
      outline: {
        borderColor: '$accentColor',
        activeOpacity: 0.8,
      },
    },

    size: {
      small: {
        padding: '$2.5',
      },
      default: {
        padding: '$3',
      },
      large: {
        padding: '$3.5',
      },
    },
  } as const,

  defaultVariants: {
    type: 'plain',
    size: 'default',
  },
})

const ButtonText = styled(Text, {
  fontSize: fontSize.true,
  adjustsFontSizeToFit: true,
  textTransform: 'uppercase',
  fontWeight: '700',
  color: '$white1',
  lineHeight: 17,
  variants: {
    type: {
      plain: {
        color: '$white1',
      },
      outline: {
        color: '$accentColor',
      },
    },
    size: {
      small: {
        fontSize: 10,
        lineHeight: 14,
      },
      default: {},
      large: {},
    },
  } as const,

  defaultVariants: {
    type: 'plain',
    size: 'default',
  },
})
