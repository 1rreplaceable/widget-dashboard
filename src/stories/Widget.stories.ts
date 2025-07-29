import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { WidgetContainer } from '../components/WidgetContainer';

// 간단한 색상 박스 컴포넌트
const RedBox = () => React.createElement('div', {
  style: { 
    width: '100%', 
    height: '100%', 
    background: '#dc3545', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    color: 'white',
    fontSize: '14px'
  }
}, 'Red Box');

const meta: Meta<typeof WidgetContainer> = {
  title: 'Widgets/WidgetContainer',
  component: WidgetContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isEditMode: {
      control: 'boolean',
    },
    gridSize: {
      control: { type: 'number', min: 10, max: 50, step: 5 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const baseLayout = {
  id: 'test-widget',
  position: { x: 0, y: 0 },
  size: { width: 200, height: 150 },
  children: RedBox(),
};

export const Default: Story = {
  args: {
    layout: baseLayout,
    isEditMode: false,
    gridSize: 20,
    maxWidth: 1200,
    maxHeight: 800,
  },
  decorators: [
    (Story) => React.createElement('div', {
      style: { 
        width: '400px', 
        height: '300px', 
        position: 'relative', 
        border: '1px solid #ccc',
        background: '#f5f5f5'
      }
    }, React.createElement(Story)),
  ],
};

export const EditMode: Story = {
  args: {
    layout: baseLayout,
    isEditMode: true,
    gridSize: 20,
    maxWidth: 1200,
    maxHeight: 800,
  },
  decorators: [
    (Story) => React.createElement('div', {
      style: { 
        width: '400px', 
        height: '300px', 
        position: 'relative', 
        border: '1px solid #ccc',
        background: '#f5f5f5'
      }
    }, React.createElement(Story)),
  ],
};

export const SmallWidget: Story = {
  args: {
    layout: {
      ...baseLayout,
      size: { width: 100, height: 80 },
    },
    isEditMode: true,
    gridSize: 20,
    maxWidth: 1200,
    maxHeight: 800,
  },
  decorators: [
    (Story) => React.createElement('div', {
      style: { 
        width: '300px', 
        height: '200px', 
        position: 'relative', 
        border: '1px solid #ccc',
        background: '#f5f5f5'
      }
    }, React.createElement(Story)),
  ],
};

export const LargeWidget: Story = {
  args: {
    layout: {
      ...baseLayout,
      size: { width: 300, height: 250 },
    },
    isEditMode: true,
    gridSize: 20,
    maxWidth: 1200,
    maxHeight: 800,
  },
  decorators: [
    (Story) => React.createElement('div', {
      style: { 
        width: '500px', 
        height: '400px', 
        position: 'relative', 
        border: '1px solid #ccc',
        background: '#f5f5f5'
      }
    }, React.createElement(Story)),
  ],
}; 