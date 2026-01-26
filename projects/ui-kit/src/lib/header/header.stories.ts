
import type { Meta, StoryObj } from '@storybook/angular';
import { Header } from './header';
import { fn } from 'storybook/test';

// 1. 使用 raw-loader 匯入原始碼字串
// 請確保路徑對應到你實際的檔案位置

// ❌ 舊的寫法 (移除 raw-loader!)
// import headerHtml from '!raw-loader!./
// header.component.html';

// ✅ 新的寫法 (加上 ?raw)
// import headerHtml from './header.component.html?raw';
// import headerScss from './header.component.scss?raw';

const htmlCode = `
<button
  [ngClass]="[
    primary ? 'btn-primary' : 'btn-secondary',
    size ? 'btn-' + size : ''
  ]"
  (click)="onClick()"
>
  {{ label }}
</button>
`;

const scssCode = `
button {
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;

  &.es-button--primary {
    color: white;
    background-color: #1ea7fd;
  }
  &.es-button--secondary {
    color: #333;
    background-color: transparent;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
  }
  &.es-button--small {
    font-size: 12px;
    padding: 10px 16px;
  }
  &.es-button--medium {
    font-size: 14px;
    padding: 11px 20px;
  }
  &.es-button--large {
    font-size: 16px;
    padding: 12px 24px;
  }
}
`;

const meta: Meta<Header> = {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: `
<!-- header.component.html -->
${htmlCode}

----------------------

/* header.component.scss */
 ${scssCode}
        `,
        language: 'html'
      }
    }
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
