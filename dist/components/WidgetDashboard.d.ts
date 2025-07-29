import React from 'react';
import { WidgetLayout } from '../types/widget';
interface WidgetDashboardProps {
    layouts: WidgetLayout[];
    isEditMode?: boolean;
    onLayoutsChange?: (layouts: WidgetLayout[]) => void;
    width?: number;
    height?: number;
    gridSize?: number;
}
export declare const WidgetDashboard: React.FC<WidgetDashboardProps>;
export {};
