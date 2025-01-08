const env = process.env
const variant = env.VARIANT
const isProd = variant === 'prod'
const isStg = variant === 'stg'

const name = 'expo-boilerplate'
const bundleId = process.env.BUNDLE_ID || 'com.liberty.expo'

const bundleSuffix = isProd ? '' : `.${variant}`
const bundleIdentifier = `${bundleId}${bundleSuffix}`

const appName = {
  prod: name,
  stg: `[S]${name}`,
  dev: `[D]${name}`,
}



const slug = {
  prod: name.toLowerCase(),
  stg: `${name}-stg`,
  dev: `${name}-dev`,
}

export default {
  expo: {
    name: name[variant] ?? AppName,
    slug: slug ?? AppName.toLowerCase(),
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier,
      infoPlist: {
        CFBundleDisplayName: appName,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: bundleId,
    },
    plugins: [
      'expo-localization',
      '@react-native-firebase/app',
      '@react-native-firebase/crashlytics',
      '@react-native-firebase/messaging',
      [
        'expo-build-properties',
        {
          android: {
            compileSdkVersion: 34,
            targetSdkVersion: 34,
            buildToolsVersion: '34.0.0',
            kotlinVersion: '1.8.0',
            extraMavenRepos: ['../../node_modules/@notifee/react-native/android/libs'],
            compileOptions: {
              sourceCompatibility: '1.8',
              targetCompatibility: '1.8',
              compilerArgs: ['-Xlint:-deprecation', '-Xlint:-unchecked'],
            },
            lintOptions: {
              abortOnError: false,
              disable: ['Deprecation', 'Unchecked'],
            },
          },
          ios: {},
        },
      ],
    ],
    web: {
      favicon: './assets/favicon.png',
    },
  },
}
