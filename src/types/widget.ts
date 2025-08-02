import React from 'react';

export interface Position {
  x: number; // 픽셀 단위
  y: number; // 픽셀 단위
}

export interface Size {
  width: number; // 픽셀 단위
  height: number; // 픽셀 단위
}

export interface WidgetLayout {
  id: string;
  title?: string;
  position: Position;
  size: Size;
  children?: React.ReactNode;
  className?: string;
  zIndex?: number;
  isVisible?: boolean;
}

export interface WidgetContainerProps {
  layout: WidgetLayout;
  isEditMode?: boolean;
  onLayoutChange?: (layout: WidgetLayout) => void;
  onResize?: (id: string, size: Size) => void;
  onMove?: (id: string, position: Position) => void;
  onDelete?: (id: string) => void;
  className?: string;
  gridSize?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export interface WidgetDashboardProps {
  layouts: WidgetLayout[];
  isEditMode?: boolean;
  onLayoutsChange?: (layouts: WidgetLayout[]) => void;
  width?: number;
  height?: number;
  gridSize?: number;
  className?: string;
}

export interface WidgetGridProps {
  layouts: WidgetLayout[];
  isEditMode?: boolean;
  onLayoutChange?: (layout: WidgetLayout) => void;
  width?: number;
  height?: number;
  gridSize?: number;
  className?: string;
} 