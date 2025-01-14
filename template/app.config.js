const env = process.env
const variant = env.VARIANT ?? 'dev'
const isProd = variant === 'prod'
const isStg = variant === 'stg'

const name = 'PROJECT_NAME'
const bundleId = 'BUNDLE.ID'

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
    name,
    slug: slug[variant] ?? appName.toLowerCase(),
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    scheme: name,
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
      appleTeamId: 'APPLE_TEAM_ID',
      infoPlist: {
        CFBundleDisplayName: appName,
      },
      googleServicesFile: `./config/google/GoogleService-Info-${variant}.plist`,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: bundleId,
      googleServicesFile: `./config/google/google-services-${variant}.json`,
      lintOptions: {
        abortOnError: false,
        disable: ['Deprecation', 'Unchecked'],
      },
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
          ios: {
            deploymentTarget: '15.6',
            useFrameworks: 'static',
          },
        },
      ],
    ],
    web: {
      favicon: './assets/favicon.png',
    },
  },
}
