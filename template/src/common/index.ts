import {Platform} from 'react-native'

export * from './env'

export const IS_IOS = Platform.OS === 'ios'
export const IS_ANDROID = Platform.OS === 'android'

export const PAGE_SIZE = 12

export const ITUNES_ID = 0
