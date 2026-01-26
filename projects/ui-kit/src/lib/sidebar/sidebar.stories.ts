import { Meta, StoryObj } from '@storybook/angular';
import { Sidebar } from './sidebar';


const meta: Meta<Sidebar> = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  // 不需要 moduleMetadata 的 providers 了！
  args: {
    isCollapsed: false,
    ongoingJobCount: 5,
    permissions: {
      optionsMaintenance: true,
      memberMaintenance: true,
      applicationFormMaintenance: true
    }
  },
};

export default meta;
type Story = StoryObj<Sidebar>;

export const Default: Story = {};

export const NoPermission: Story = {
  args: {
    ongoingJobCount: 0,
    permissions: {
      optionsMaintenance: false,
      memberMaintenance: false,
      applicationFormMaintenance: false
    }
  }
};
