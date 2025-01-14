import notifee, {
  AndroidCategory,
  AndroidImportance,
  AndroidVisibility,
  Event,
  EventType,
} from '@notifee/react-native'
import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging'
import * as Notifications from 'expo-notifications'

import storage from './storage'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,

    priority: Notifications.AndroidNotificationPriority.HIGH,
  }),
})

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  // await onDisplayNotification(remoteMessage)
})

// Background event handler
notifee.onBackgroundEvent(async event => onNavigate(event))

const request = async () => {
  const authorizationStatus = await messaging().requestPermission()

  if (authorizationStatus) {
    return await messaging().getToken()
  }
}

const refresh = async () => {
  await messaging().deleteToken()
  return request()
}

const onNavigate = ({type, detail}: Event) => {
  switch (type) {
    case EventType.PRESS: {
      // TODO: Navigate to the screen
      break
    }
  }
}

const display = async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
  const payload = remoteMessage?.notification
  const title = payload?.title
  if (!title) return

  return notifee.displayNotification({
    title,
    body: payload?.body ?? 'New Notification',
    data: remoteMessage?.data,
    android: {
      channelId: 'PROJECT_NAME',
      importance: AndroidImportance.HIGH,
      category: AndroidCategory.MESSAGE,
      visibility: AndroidVisibility.PUBLIC,
      // smallIcon: "https://cdn-icons-png.flaticon.com/512/15368/15368871.png",
      circularLargeIcon: true,

      pressAction: {
        launchActivity: 'default',
        id: 'default',
      },
    },
    ios: {
      foregroundPresentationOptions: {
        badge: true,
        sound: true,
        banner: true,
        list: true,
      },
    },
  })
}

const initialized = async () => {
  await request().then(token => {
    if (token) storage.set('FCM_TOKEN', token)
  })

  notifee.requestPermission({
    criticalAlert: true,
  })

  notifee.createChannel({
    id: 'PROJECT_NAME',
    name: 'PROJECT_NAME Channel',
    vibration: true,
    importance: AndroidImportance.HIGH,
  })
}

// Listen for messages when the app is in the foreground.
const onMessage = messaging().onMessage(remoteData => display(remoteData))

export {request, refresh, initialized, display, onMessage}
