import React, { useState, useRef, useEffect } from 'react';
import { WidgetLayout } from '../types/widget';
import './WidgetContainer.css';

interface WidgetContainerProps {
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

export const WidgetContainer: React.FC<WidgetContainerProps> = ({
  layout,
  isEditMode = false,
  onLayoutChange,
  onResize,
  onMove,
  className = '',
  gridSize = 20,
  maxWidth = 1200,
  maxHeight = 800,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, mouseX: 0, mouseY: 0 });
  const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, mouseX: 0, mouseY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isEditMode) return;
    e.preventDefault();
    e.stopPropagation();
    
    setDragStart({
      x: layout.position.x,
      y: layout.position.y,
      mouseX: e.clientX,
      mouseY: e.clientY,
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isEditMode) return;

    if (isDragging) {
      e.preventDefault();
      
      // 마우스 움직임 계산
      const deltaX = e.clientX - dragStart.mouseX;
      const deltaY = e.clientY - dragStart.mouseY;
      
      // 그리드에 맞춰 스냅
      const newX = Math.round((dragStart.x + deltaX) / gridSize) * gridSize;
      const newY = Math.round((dragStart.y + deltaY) / gridSize) * gridSize;
      
      // 경계 체크 - 격자에 정확히 맞춤
      const clampedX = Math.max(0, Math.min(newX, maxWidth - layout.size.width));
      const clampedY = Math.max(0, Math.min(newY, maxHeight - layout.size.height));

      // 위치가 변경된 경우에만 업데이트
      if (clampedX !== layout.position.x || clampedY !== layout.position.y) {
        onMove?.(layout.id, { x: clampedX, y: clampedY });
      }
    }

    if (isResizing) {
      e.preventDefault();
      
      const deltaX = e.clientX - resizeStart.mouseX;
      const deltaY = e.clientY - resizeStart.mouseY;
      
      // 그리드에 맞춰 스냅
      const newWidth = Math.round((resizeStart.width + deltaX) / gridSize) * gridSize;
      const newHeight = Math.round((resizeStart.height + deltaY) / gridSize) * gridSize;
      
      // 경계 체크 - 격자에 정확히 맞춤
      const clampedWidth = Math.max(gridSize, Math.min(newWidth, maxWidth - layout.position.x));
      const clampedHeight = Math.max(gridSize, Math.min(newHeight, maxHeight - layout.position.y));

      // 크기가 변경된 경우에만 업데이트
      if (clampedWidth !== layout.size.width || clampedHeight !== layout.size.height) {
        onResize?.(layout.id, { width: clampedWidth, height: clampedHeight });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    if (!isEditMode) return;
    e.preventDefault();
    e.stopPropagation();
    
    setResizeStart({
      width: layout.size.width,
      height: layout.size.height,
      mouseX: e.clientX,
      mouseY: e.clientY,
    });
    setIsResizing(true);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, resizeStart]);

  const containerStyle = {
    position: 'absolute' as const,
    left: `${layout.position.x}px`,
    top: `${layout.position.y}px`,
    width: `${layout.size.width}px`,
    height: `${layout.size.height}px`,
    cursor: isEditMode ? (isDragging ? 'grabbing' : 'grab') : 'default',
  };

  return (
    <div
      ref={containerRef}
      className={`widget-container ${isEditMode ? 'edit-mode' : ''} ${isDragging ? 'dragging' : ''} ${className}`}
      style={containerStyle}
      onMouseDown={handleMouseDown}
    >
      <div className="widget-content">
        {layout.children}
      </div>
      
      {isEditMode && (
        <div className="widget-resize-handle" onMouseDown={handleResizeStart} />
      )}
    </div>
  );
}; 