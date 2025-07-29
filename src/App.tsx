import React, { useState } from 'react';
import { WidgetLayout } from './types/widget';
import { WidgetDashboard } from './components/WidgetDashboard';
import './App.css';

const MetricWidget: React.FC = () => (
  <div style={{ 
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '8px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #e9ecef'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#212529', marginBottom: '8px' }}>1,234</div>
      <div style={{ fontSize: '14px', color: '#6c757d' }}>총 사용자</div>
    </div>
  </div>
);

const ChartWidget: React.FC = () => (
  <div style={{ 
    padding: '20px',
    background: '#ffffff',
    borderRadius: '8px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #e9ecef'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '24px', marginBottom: '8px' }}>📊</div>
      <div style={{ fontSize: '14px', color: '#6c757d' }}>월별 매출 차트</div>
    </div>
  </div>
);

const TableWidget: React.FC = () => (
  <div style={{ 
    padding: '16px',
    background: '#ffffff',
    borderRadius: '8px',
    height: '100%',
    border: '1px solid #e9ecef'
  }}>
    <table style={{ width: '100%', fontSize: '12px' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid #dee2e6' }}>
          <th style={{ textAlign: 'left', padding: '8px', color: '#495057' }}>항목</th>
          <th style={{ textAlign: 'right', padding: '8px', color: '#495057' }}>값</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ padding: '8px', color: '#212529' }}>주문 수</td>
          <td style={{ textAlign: 'right', padding: '8px', color: '#212529' }}>1,234</td>
        </tr>
        <tr>
          <td style={{ padding: '8px', color: '#212529' }}>매출액</td>
          <td style={{ textAlign: 'right', padding: '8px', color: '#212529' }}>₩12,345,678</td>
        </tr>
      </tbody>
    </table>
  </div>
);

function App() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [layouts, setLayouts] = useState<WidgetLayout[]>([
    {
      id: '1',
      title: '사용자 지표',
      position: { x: 0, y: 0 },
      size: { width: 200, height: 120 },
      children: <MetricWidget />,
    },
    {
      id: '2',
      title: '매출 차트',
      position: { x: 200, y: 0 },
      size: { width: 300, height: 200 },
      children: <ChartWidget />,
    },
    {
      id: '3',
      title: '주문 현황',
      position: { x: 500, y: 0 },
      size: { width: 240, height: 160 },
      children: <TableWidget />,
    },
    {
      id: '4',
      title: '추가 위젯',
      position: { x: 0, y: 120 },
      size: { width: 180, height: 100 },
      children: <MetricWidget />,
    },
  ]);

  const handleLayoutsChange = (newLayouts: WidgetLayout[]) => {
    setLayouts(newLayouts);
    console.log('레이아웃 변경:', newLayouts);
  };

  return (
    <div className="App">
      <div className="app-header">
        <h1>위젯 대시보드</h1>
        <button 
          className={`mode-toggle ${isEditMode ? 'active' : ''}`}
          onClick={() => setIsEditMode(!isEditMode)}
        >
          {isEditMode ? '보기 모드' : '편집 모드'}
        </button>
      </div>
      
      <WidgetDashboard 
        layouts={layouts}
        isEditMode={isEditMode}
        onLayoutsChange={handleLayoutsChange}
        width={1200}
        height={800}
        gridSize={20}
      />
    </div>
  );
}

export default App;
