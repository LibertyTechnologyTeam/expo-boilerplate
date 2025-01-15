import {CommonActions, createNavigationContainerRef, StackActions} from '@react-navigation/native'

import {StackList, StackRoute} from '@/types'

import {Route} from './Route'

const parseRoute = (route: any): {name: string; enabled: boolean} => {
  const name: string = typeof route === 'string' ? route : (route?.name ?? '')

  // TODO: Authentication Flow
  const enabled = true

  return {name, enabled}
}

const navigationRef = createNavigationContainerRef<StackList>()

type RouteName = keyof typeof Route

const navigate = (name: RouteName, params?: StackList[RouteName]): void => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as any, params)
  }
}

const getCurrentScreenName = () => navigationRef?.getCurrentRoute()?.name

const getPrevScreenName = () => {
  const navState = navigationRef.getRootState()
  const index = navState?.index
  const route = navState?.routes?.[index - 1]

  if (route?.name === Route.Main) {
    const state = route?.state
    const history = state?.history
    const routes = state?.routes
    const historyLength = history?.length
    if (state && historyLength && routes?.length) {
      const currentRouteKey = (history?.[historyLength - 1] as any)?.key
      const findItem = routes.find((item: any) => currentRouteKey && currentRouteKey === item?.key)
      return findItem?.name ?? ''
    } else {
      return ''
    }
  }

  return route?.name ?? ''
}

const push = (route: RouteName, params?: StackList[RouteName]): void => {
  const {name, enabled} = parseRoute(route)
  if (enabled) navigationRef?.dispatch(StackActions.push(name, params))
}

const replace = (route: RouteName, params?: StackList[RouteName]): void => {
  const {name, enabled} = parseRoute(route)
  if (enabled) navigationRef?.dispatch(StackActions.replace(name, params))
}

const goBack = () => navigationRef?.dispatch(CommonActions.goBack())

const pop = (step: number) => {
  const popAction = StackActions.pop(step)
  navigationRef?.dispatch(popAction)
}

export const getRoute = (): StackRoute | boolean => {
  if (!navigationRef?.isReady()) return false

  return navigationRef?.getCurrentRoute() as StackRoute
}

export const navigation = {
  goBack,
  push,
  replace,
  navigate,
  pop,
  getRoute,
  navigationRef,
  getPrevScreenName,
  getCurrentScreenName,
}
