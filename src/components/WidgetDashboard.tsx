import React, { useState } from 'react';
import { WidgetLayout } from '../types/widget';
import { WidgetGrid } from './WidgetGrid';
import './WidgetDashboard.css';

interface WidgetDashboardProps {
  layouts: WidgetLayout[];
  isEditMode?: boolean;
  onLayoutsChange?: (layouts: WidgetLayout[]) => void;
  width?: number;
  height?: number;
  gridSize?: number;
}

export const WidgetDashboard: React.FC<WidgetDashboardProps> = ({
  layouts,
  isEditMode = false,
  onLayoutsChange,
  width = 1200,
  height = 800,
  gridSize = 20,
}) => {
  const [layoutsState, setLayoutsState] = useState<WidgetLayout[]>(layouts);

  const handleLayoutChange = (updatedLayout: WidgetLayout) => {
    const newLayouts = layoutsState.map(layout => 
      layout.id === updatedLayout.id ? updatedLayout : layout
    );
    setLayoutsState(newLayouts);
    onLayoutsChange?.(newLayouts);
  };

  return (
    <div className="widget-dashboard">
      <WidgetGrid
        layouts={layoutsState}
        isEditMode={isEditMode}
        onLayoutChange={handleLayoutChange}
        width={width}
        height={height}
        gridSize={gridSize}
      />
    </div>
  );
}; 