import React, { useState } from 'react';
import { WidgetDashboard } from './components/WidgetDashboard';
import { WidgetLayout } from './types/widget';
import './components/WidgetDashboard.css';

// 간단한 테스트 위젯들
const RedWidget: React.FC = () => (
  <div style={{ 
    width: '100%', 
    height: '100%', 
    background: '#dc3545', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold'
  }}>
    Red Widget
  </div>
);

const BlueWidget: React.FC = () => (
  <div style={{ 
    width: '100%', 
    height: '100%', 
    background: '#007bff', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold'
  }}>
    Blue Widget
  </div>
);

const GreenWidget: React.FC = () => (
  <div style={{ 
    width: '100%', 
    height: '100%', 
    background: '#28a745', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold'
  }}>
    Green Widget
  </div>
);

const ChartWidget: React.FC = () => (
  <div style={{ 
    width: '100%', 
    height: '100%', 
    background: '#ffffff', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    border: '1px solid #e9ecef',
    borderRadius: '8px'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '24px', marginBottom: '8px' }}>📊</div>
      <div style={{ fontSize: '14px', color: '#6c757d' }}>Chart Widget</div>
    </div>
  </div>
);

function App() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [layouts, setLayouts] = useState<WidgetLayout[]>([
    {
      id: '1',
      position: { x: 0, y: 0 },
      size: { width: 200, height: 150 },
      children: <RedWidget />,
    },
    {
      id: '2',
      position: { x: 220, y: 0 },
      size: { width: 300, height: 200 },
      children: <BlueWidget />,
    },
    {
      id: '3',
      position: { x: 540, y: 0 },
      size: { width: 250, height: 150 },
      children: <GreenWidget />,
    },
    {
      id: '4',
      position: { x: 0, y: 170 },
      size: { width: 400, height: 200 },
      children: <ChartWidget />,
    },
  ]);

  const handleLayoutsChange = (newLayouts: WidgetLayout[]) => {
    setLayouts(newLayouts);
    console.log('레이아웃 변경:', newLayouts);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        padding: '0 20px'
      }}>
        <h1 style={{ margin: 0, color: '#333' }}>Widget Dashboard Test</h1>
        <button 
          onClick={() => setIsEditMode(!isEditMode)}
          style={{
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            backgroundColor: isEditMode ? '#dc3545' : '#007bff',
            color: 'white',
            transition: 'background-color 0.3s'
          }}
        >
          {isEditMode ? '보기 모드' : '편집 모드'}
        </button>
      </div>
      
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        overflow: 'hidden',
        backgroundColor: '#f8f9fa'
      }}>
        <WidgetDashboard 
          layouts={layouts}
          isEditMode={isEditMode}
          onLayoutsChange={handleLayoutsChange}
          width={1200}
          height={800}
          gridSize={20}
        />
      </div>
    </div>
  );
}

export default App;
