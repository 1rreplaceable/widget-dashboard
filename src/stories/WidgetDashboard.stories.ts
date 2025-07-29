import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { WidgetDashboard } from '../components/WidgetDashboard';

// 간단한 색상 박스 컴포넌트들
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

const BlueBox = () => React.createElement('div', {
  style: { 
    width: '100%', 
    height: '100%', 
    background: '#007bff', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    color: 'white',
    fontSize: '14px'
  }
}, 'Blue Box');

const GreenBox = () => React.createElement('div', {
  style: { 
    width: '100%', 
    height: '100%', 
    background: '#28a745', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    color: 'white',
    fontSize: '14px'
  }
}, 'Green Box');

const meta: Meta<typeof WidgetDashboard> = {
  title: 'Widgets/WidgetDashboard',
  component: WidgetDashboard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    layouts: [
      {
        id: '1',
        position: { x: 0, y: 0 },
        size: { width: 200, height: 120 },
        children: RedBox(),
      },
      {
        id: '2',
        position: { x: 220, y: 0 },
        size: { width: 300, height: 200 },
        children: BlueBox(),
      },
      {
        id: '3',
        position: { x: 540, y: 0 },
        size: { width: 250, height: 150 },
        children: GreenBox(),
      },
    ],
    isEditMode: true,
    width: 1200,
    height: 800,
    gridSize: 20,
  },
};

// 작은 위젯들
export const SmallWidgets: Story = {
  args: {
    layouts: [
      {
        id: '1',
        position: { x: 0, y: 0 },
        size: { width: 100, height: 80 },
        children: RedBox(),
      },
      {
        id: '2',
        position: { x: 120, y: 0 },
        size: { width: 100, height: 80 },
        children: BlueBox(),
      },
      {
        id: '3',
        position: { x: 240, y: 0 },
        size: { width: 100, height: 80 },
        children: GreenBox(),
      },
    ],
    isEditMode: true,
    width: 800,
    height: 600,
    gridSize: 20,
  },
};

// 중간 크기 위젯들
export const MediumWidgets: Story = {
  args: {
    layouts: [
      {
        id: '1',
        position: { x: 0, y: 0 },
        size: { width: 200, height: 150 },
        children: RedBox(),
      },
      {
        id: '2',
        position: { x: 220, y: 0 },
        size: { width: 200, height: 150 },
        children: BlueBox(),
      },
      {
        id: '3',
        position: { x: 440, y: 0 },
        size: { width: 200, height: 150 },
        children: GreenBox(),
      },
    ],
    isEditMode: true,
    width: 1000,
    height: 700,
    gridSize: 20,
  },
};

// 큰 위젯들
export const LargeWidgets: Story = {
  args: {
    layouts: [
      {
        id: '1',
        position: { x: 0, y: 0 },
        size: { width: 400, height: 300 },
        children: RedBox(),
      },
      {
        id: '2',
        position: { x: 420, y: 0 },
        size: { width: 400, height: 300 },
        children: BlueBox(),
      },
    ],
    isEditMode: true,
    width: 1200,
    height: 800,
    gridSize: 20,
  },
};

// 혼합 크기
export const MixedSizes: Story = {
  args: {
    layouts: [
      {
        id: '1',
        position: { x: 0, y: 0 },
        size: { width: 150, height: 100 },
        children: RedBox(),
      },
      {
        id: '2',
        position: { x: 170, y: 0 },
        size: { width: 300, height: 200 },
        children: BlueBox(),
      },
      {
        id: '3',
        position: { x: 490, y: 0 },
        size: { width: 200, height: 150 },
        children: GreenBox(),
      },
    ],
    isEditMode: true,
    width: 1000,
    height: 600,
    gridSize: 20,
  },
};

// 고정 너비 컨테이너
export const FixedWidthContainer: Story = {
  args: {
    layouts: [
      {
        id: '1',
        position: { x: 0, y: 0 },
        size: { width: 180, height: 120 },
        children: RedBox(),
      },
      {
        id: '2',
        position: { x: 200, y: 0 },
        size: { width: 200, height: 150 },
        children: BlueBox(),
      },
      {
        id: '3',
        position: { x: 420, y: 0 },
        size: { width: 160, height: 100 },
        children: GreenBox(),
      },
    ],
    isEditMode: true,
    width: 600,
    height: 400,
    gridSize: 20,
  },
  decorators: [
    (Story) => React.createElement('div', {
      style: { width: '600px', height: '400px', margin: '0 auto', border: '1px solid #ccc' }
    }, React.createElement(Story)),
  ],
}; 