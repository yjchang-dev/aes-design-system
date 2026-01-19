
import type { Meta, StoryObj } from '@storybook/angular';
import { Header } from './header';
import { fn } from 'storybook/test';


const meta: Meta<Header> = {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen', // 讓 header 滿版
  },
  // 使用 fn() 來模擬事件被觸發，這樣可以在 Actions 面板看到 log
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
