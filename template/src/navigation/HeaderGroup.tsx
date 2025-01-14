import {NavigationBar} from '@/component'
import {useTranslate} from '@/hook'
import Profile from '@/screen/Profile'

import {Group, Screen} from './NavigationAction'
import {Route} from './Route'

export default function HeaderGroup() {
  const translate = useTranslate()

  return (
    <Group
      screenOptions={{
        headerShown: true,
        header: props => <NavigationBar title={props.options.title} />,
      }}>
      <Screen name={Route.Profile} component={Profile} options={{title: translate('Personal')}} />
    </Group>
  )
}
