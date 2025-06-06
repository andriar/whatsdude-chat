import type { Meta, StoryObj } from '@storybook/vue3'
import MyWelcome from './MyWelcome.vue'

const meta: Meta<typeof MyWelcome> = {
  title: 'Components/MyWelcome',
  component: MyWelcome,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
