import {GestureResponderEvent, Pressable} from 'react-native'

import {GetProps, styled, Text, TextProps, View} from '@tamagui/core'

import {onHaptic} from '@/service'
import {fontSize} from '@/theme/size'

type LabelViewProps = GetProps<typeof LabelView>

export interface LabelProps extends LabelViewProps {
  title?: string
  titleProps?: TextProps
  tracking?: {
    //
  }
}

export const Label = ({titleProps, ...props}: LabelProps) => {
  const onPress = (e: GestureResponderEvent) => {
    onHaptic()
    props?.onPress?.(e)
  }

  return (
    <Pressable onPress={onPress}>
      <LabelView {...props}>
        <LabelText type={props.type} size={props.size} {...titleProps}>
          {props?.title ?? ''}
        </LabelText>
      </LabelView>
    </Pressable>
  )
}

const LabelView = styled(View, {
  justifyContent: 'center',
  alignItems: 'center',

  borderRadius: '$1',
  gap: '$4',
  borderWidth: 1,
  borderColor: '$colorTransparent',
  padding: '$1.5',
  paddingHorizontal: '$3',
  variants: {
    type: {
      plain: {
        backgroundColor: '$mauve12',
      },
      outline: {
        borderColor: '$mauve12',
        activeOpacity: 0.8,
      },
    },
    size: {
      small: {},
      default: {},
      large: {},
    },
  } as const,

  defaultVariants: {
    type: 'plain',
  },
})

const LabelText = styled(Text, {
  fontSize: fontSize.true,
  color: '$mauve4',
  variants: {
    type: {
      plain: {
        color: '$mauve4',
      },
      outline: {
        color: '$mauve12',
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
