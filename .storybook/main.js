const { mergeConfig } = require('vite');
const {
  linterPlugin,
  EsLinter,
  TypeScriptLinter,
} = require('vite-plugin-linter');

module.exports = {
  stories: [
    './stories/**/*.stories.mdx',
    './stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: { builder: '@storybook/builder-vite' },
  async viteFinal(configEnv, { configType }) {
    return mergeConfig(configEnv, {
      plugins: [
        linterPlugin({
          include: ['./src/**/*.ts', './src/**/*.tsx'],
          linters: [new EsLinter({ configEnv }), new TypeScriptLinter()],
        }),
      ],
    });
  },
};
