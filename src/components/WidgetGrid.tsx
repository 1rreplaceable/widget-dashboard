import React from 'react';
import { WidgetLayout } from '../types/widget';
import { WidgetContainer } from './WidgetContainer';
import './WidgetGrid.css';

interface WidgetGridProps {
  layouts: WidgetLayout[];
  isEditMode?: boolean;
  onLayoutChange?: (layout: WidgetLayout) => void;
  width?: number;
  height?: number;
  gridSize?: number;
}

export const WidgetGrid: React.FC<WidgetGridProps> = ({
  layouts,
  isEditMode = false,
  onLayoutChange,
  width = 1200,
  height = 800,
  gridSize = 20,
}) => {
  const gridStyle = {
    position: 'relative' as const,
    width: `${width}px`,
    height: `${height}px`,
    padding: '0px',
    background: '#ffffff',
    overflow: 'auto',
    '--grid-size': `${gridSize}px`,
  } as React.CSSProperties;

  const handleMove = (id: string, position: { x: number; y: number }) => {
    const layout = layouts.find(l => l.id === id);
    if (layout) {
      const newLayout = { ...layout, position };
      onLayoutChange?.(newLayout);
    }
  };

  const handleResize = (id: string, size: { width: number; height: number }) => {
    const layout = layouts.find(l => l.id === id);
    if (layout) {
      const newLayout = { ...layout, size };
      onLayoutChange?.(newLayout);
    }
  };

  return (
    <div className={`widget-grid ${isEditMode ? 'edit-mode' : ''}`} style={gridStyle}>
      {layouts.map((layout) => (
        <WidgetContainer
          key={layout.id}
          layout={layout}
          isEditMode={isEditMode}
          onMove={handleMove}
          onResize={handleResize}
          gridSize={gridSize}
          maxWidth={width}
          maxHeight={height}
        />
      ))}
    </div>
  );
}; 