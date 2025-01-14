import {useEffect} from 'react'

import {GetProps, styled, View} from '@tamagui/core'

const ContainerView = styled(View, {
  name: 'Container',
  bg: '$background',
  flex: 1,
})

type ContainerViewProps = GetProps<typeof ContainerView>

export interface ContainerProps extends ContainerViewProps {
  tracking?: {
    //
  }
}

export const Container = ({children, tracking}: ContainerProps) => {
  useEffect(() => {
    if (tracking) {
      // TODO: Tracking Screen
    }
  }, [])

  return <ContainerView>{children}</ContainerView>
}
