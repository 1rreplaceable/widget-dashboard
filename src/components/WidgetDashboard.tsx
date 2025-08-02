import React, { useState } from 'react';
import { WidgetLayout, WidgetDashboardProps } from '../types/widget';
import { WidgetGrid } from './WidgetGrid';
import './WidgetDashboard.css';

export const WidgetDashboard: React.FC<WidgetDashboardProps> = ({
  layouts,
  isEditMode = false,
  onLayoutsChange,
  width = 1400,
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