import React, { useState, useRef, useEffect } from 'react';
import { WidgetLayout, WidgetContainerProps } from '../types/widget';
import './WidgetContainer.css';

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
  const tempPositionRef = useRef(layout.position);
  const tempSizeRef = useRef(layout.size);
  const containerRef = useRef<HTMLDivElement>(null);

  // layout이 변경되면 임시 상태도 업데이트
  useEffect(() => {
    tempPositionRef.current = layout.position;
    tempSizeRef.current = layout.size;
  }, [layout.position, layout.size]);

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
      
      // 경계 체크 - 대시보드 영역 내에서만 이동 가능
      const clampedX = Math.max(0, Math.min(newX, maxWidth - layout.size.width));
      const clampedY = Math.max(0, Math.min(newY, maxHeight - layout.size.height));

      // 임시 상태만 업데이트 (실제 콜백은 호출하지 않음)
      // 값이 실제로 변경된 경우에만 업데이트
      if (clampedX !== tempPositionRef.current.x || clampedY !== tempPositionRef.current.y) {
        tempPositionRef.current = { x: clampedX, y: clampedY };
        // DOM 직접 업데이트로 리렌더링 방지
        if (containerRef.current) {
          containerRef.current.style.left = `${clampedX}px`;
          containerRef.current.style.top = `${clampedY}px`;
        }
      }
    }

    if (isResizing) {
      e.preventDefault();
      
      const deltaX = e.clientX - resizeStart.mouseX;
      const deltaY = e.clientY - resizeStart.mouseY;
      
      // 그리드에 맞춰 스냅
      const newWidth = Math.round((resizeStart.width + deltaX) / gridSize) * gridSize;
      const newHeight = Math.round((resizeStart.height + deltaY) / gridSize) * gridSize;
      
      // 경계 체크 - 대시보드 영역을 넘지 않도록 크기 제한
      const clampedWidth = Math.max(gridSize, Math.min(newWidth, maxWidth - layout.position.x));
      const clampedHeight = Math.max(gridSize, Math.min(newHeight, maxHeight - layout.position.y));

      // 임시 상태만 업데이트 (실제 콜백은 호출하지 않음)
      // 값이 실제로 변경된 경우에만 업데이트
      if (clampedWidth !== tempSizeRef.current.width || clampedHeight !== tempSizeRef.current.height) {
        tempSizeRef.current = { width: clampedWidth, height: clampedHeight };
        // DOM 직접 업데이트로 리렌더링 방지
        if (containerRef.current) {
          containerRef.current.style.width = `${clampedWidth}px`;
          containerRef.current.style.height = `${clampedHeight}px`;
        }
      }
    }
  };

  const handleMouseUp = () => {
    // 드래그가 끝났을 때만 실제 콜백 호출
    if (isDragging) {
      onMove?.(layout.id, tempPositionRef.current);
    }
    
    // 리사이즈가 끝났을 때만 실제 콜백 호출
    if (isResizing) {
      onResize?.(layout.id, tempSizeRef.current);
    }
    
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