import tamaguiNextPlugin from '@tamagui/next-plugin'

const { withTamagui } = tamaguiNextPlugin

/** @type {import('next').NextConfig} */
let config = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx'],

  // runs on the root level
  typescript: {
    ignoreBuildErrors: false,
  },
  transpilePackages: ['react-native-web', '@status-im/components'],
  eslint: {
    ignoreDuringBuilds: true,
  },
}

const plugins = [
  withTamagui({
    config: './tamagui.config.ts',
    components: ['@status-im/components'],
    excludeReactNativeWebExports: [
      'Switch',
      'ProgressBar',
      'Picker',
      'CheckBox',
      'Touchable',
      'Modal',
    ],
  }),
]

const configure = () => {
  for (const plugin of plugins) {
    config = {
      ...config,
      ...plugin(config),
    }
  }

  return config
}

export default configure
