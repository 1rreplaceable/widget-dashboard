import React from 'react';
import { WidgetLayout } from '../types/widget';
import './WidgetGrid.css';
interface WidgetGridProps {
    layouts: WidgetLayout[];
    isEditMode?: boolean;
    onLayoutChange?: (layout: WidgetLayout) => void;
    width?: number;
    height?: number;
    gridSize?: number;
}
export declare const WidgetGrid: React.FC<WidgetGridProps>;
export {};
