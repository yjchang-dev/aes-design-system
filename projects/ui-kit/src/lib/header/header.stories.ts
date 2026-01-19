
import type { Meta, StoryObj } from '@storybook/angular';
import { Header } from './header';
import { fn } from 'storybook/test';

// 1. 使用 raw-loader 匯入原始碼字串
// 請確保路徑對應到你實際的檔案位置
import headerHtml from '!raw-loader!./header.component.html';
import headerScss from '!raw-loader!./header.component.scss';

const meta: Meta<Header> = {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    // 2. 設定 Docs 區塊的描述
    docs: {
      description: {
        component: `
### 元件原始碼結構
這裡展示此元件內部的實作細節，包含結構與樣式。

#### HTML Template
\`\`\`html
${headerHtml}
\`\`\`

#### SCSS Styles
\`\`\`scss
${headerScss}
\`\`\`
        `,
      },
    },
  },
  args: {
    toggleSidebar: fn(),
    switchFactory: fn(),
    logout: fn(),
  },
};

export default meta;
type Story = StoryObj<Header>;

// 模擬的資料
const mockUser = {
  name: 'YJ.Chang',
  department: 'role',
  currentFactory: 'TWM8',
  canSwitchFactory: true
};

const mockSystemInfo = {
  version: 'v1.2.0',
  publishDate: '2026-01-19',
  environment: 'Development',
  apiVersion: 'v1.5.0',
  apiPublishDate: '2026-01-15'
};

export const MultiFactory: Story = {
  args: {
    user: mockUser,
    systemInfo: mockSystemInfo
  },
};

export const SingleFactory: Story = {
  args: {
    user: { ...mockUser, canSwitchFactory: false, currentFactory: 'TWM8' },
    systemInfo: mockSystemInfo
  },
};
