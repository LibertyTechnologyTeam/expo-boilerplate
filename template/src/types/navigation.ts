import {NavigationProp, RouteProp} from '@react-navigation/native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import {Route} from '@/navigation/Route'

export type ScreenProps<T extends keyof StackList> = NativeStackScreenProps<StackList, T>

export type RootStackScreenProps<T extends keyof StackList> = NativeStackScreenProps<StackList, T>

export type StackNavigation = NativeStackScreenProps<StackList>['navigation']

export type StackRoute = NativeStackScreenProps<StackList>['route']

export type NavigationType<T extends keyof StackList> = NavigationProp<StackList, T>

export type RouteType<T extends keyof StackList> = RouteProp<StackList, T>

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends StackList {}
  }
}

export type MainTabParamsType = {
  icon: string
  title: string
}

export type MainTabParamListType = {
  [Route.Home]?: MainTabParamsType
  [Route.Profile]?: MainTabParamsType
  [Route.Menu]?: MainTabParamsType
}

export type StackList = {
  [key: string]: any
  [Route.Main]: MainTabParamListType | {screen?: keyof MainTabParamListType}
}
