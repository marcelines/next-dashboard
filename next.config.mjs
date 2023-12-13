import tamaguiNextPlugin from '@tamagui/next-plugin'

const { withTamagui } = tamaguiNextPlugin

/** @type {import('next').NextConfig} */
let config = {
  // output: 'export',
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx'],

  // runs on the root level
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

const plugins = [
  // withVercelToolbar(),
  withTamagui({
    config: './tamagui.config.ts',
    appDir: true,
    components: ['tamagui'],
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
