import React from 'react';
import { WidgetLayout } from '../types/widget';
import './WidgetContainer.css';
interface WidgetContainerProps {
    layout: WidgetLayout;
    isEditMode?: boolean;
    onLayoutChange?: (layout: WidgetLayout) => void;
    onResize?: (id: string, size: {
        width: number;
        height: number;
    }) => void;
    onMove?: (id: string, position: {
        x: number;
        y: number;
    }) => void;
    className?: string;
    gridSize?: number;
    maxWidth?: number;
    maxHeight?: number;
}
export declare const WidgetContainer: React.FC<WidgetContainerProps>;
export {};
