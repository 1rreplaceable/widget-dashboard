export interface WidgetLayout {
  id: string;
  title?: string;
  position: {
    x: number; // 픽셀 단위
    y: number; // 픽셀 단위
  };
  size: {
    width: number; // 픽셀 단위
    height: number; // 픽셀 단위
  };
  children?: React.ReactNode;
  className?: string;
}

export interface WidgetContainerProps {
  layout: WidgetLayout;
  isEditMode?: boolean;
  onLayoutChange?: (layout: WidgetLayout) => void;
  onResize?: (id: string, size: { width: number; height: number }) => void;
  onMove?: (id: string, position: { x: number; y: number }) => void;
  className?: string;
  gridSize?: number;
  maxWidth?: number;
  maxHeight?: number;
} 