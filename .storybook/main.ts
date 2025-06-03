import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../components/**/*.mdx', '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    // Use require to avoid TypeScript module resolution issues
    const { mergeConfig } = require('vite')
    const vue = require('@vitejs/plugin-vue')

    return mergeConfig(config, {
      plugins: [vue.default ? vue.default() : vue()],
      resolve: {
        alias: {
          '~': process.cwd(),
          '@': process.cwd(),
        },
      },
      define: {
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
      },
    })
  },
}
export default config
