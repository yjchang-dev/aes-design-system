import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/angular",

  // // --- 新增這段 Webpack 設定 ---
  // webpackFinal: async (config) => {
  //   // 確保 config.module 和 rules 存在，避免報錯
  //   config.module = config.module || {};
  //   config.module.rules = config.module.rules || [];

  //   // 加入新規則：只要 import 路徑包含 "?raw"，就使用 asset/source (讀成字串)
  //   config.module.rules.push({
  //     resourceQuery: /raw/,
  //     type: 'asset/source',
  //   });

  //   return config;
  // },
};
export default config;
