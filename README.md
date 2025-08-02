# Widget Dashboard

유연한 위젯 대시보드와 드래그앤드롭 기능을 제공하는 React 라이브러리입니다.

![Widget Dashboard Demo](./docs/demo.gif)

## 주요 기능

- **고성능 드래그/리사이즈**: useRef 기반 최적화로 부드러운 60fps 동작
- **픽셀 단위 정확한 위치/크기 저장**: 20px 그리드 스냅 지원
- **편집/보기 모드 전환**: 사용자 친화적인 인터페이스
- **완전 커스텀 위젯 컴포넌트**: React 컴포넌트로 자유로운 디자인
- **성능 최적화**: 드래그 중 불필요한 콜백 호출 방지
- **유연한 크기 설정**: width, height props로 원하는 크기 설정 가능

## 설치

```bash
npm install widget-dashboard@latest
```

## 요구사항

- React 16.8.0 이상
- TypeScript 지원 (선택사항)

## 사용법

### 기본 사용법

```tsx
import React, { useState } from 'react';
import { WidgetDashboard, WidgetLayout, Position, Size } from 'widget-dashboard';

// 커스텀 위젯 컴포넌트
const MetricWidget = () => (
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

const ChartWidget = () => (
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

// 위젯 레이아웃 정의
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
]);

// 대시보드 컴포넌트 사용
function App() {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleLayoutsChange = (newLayouts: WidgetLayout[]) => {
    setLayouts(newLayouts);
    // 성능 최적화: 마우스 업 시에만 호출됨
    console.log('레이아웃 변경:', newLayouts);
  };

  return (
    <div className="App">
      <div className="app-header">
        <h1>위젯 대시보드</h1>
        <button onClick={() => setIsEditMode(!isEditMode)}>
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
```

## API

### WidgetDashboard Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `layouts` | `WidgetLayout[]` | `[]` | 위젯 레이아웃 배열 |
| `isEditMode` | `boolean` | `false` | 편집 모드 활성화 여부 |
| `onLayoutsChange` | `(layouts: WidgetLayout[]) => void` | - | 레이아웃 변경 콜백 (마우스 업 시에만 호출) |
| `width` | `number` | `1400` | 대시보드 너비 (px) |
| `height` | `number` | `800` | 대시보드 높이 (px) |
| `gridSize` | `number` | `20` | 그리드 크기 (px) |
| `className` | `string` | - | 추가 CSS 클래스 |

### WidgetLayout Interface

```tsx
interface WidgetLayout {
  id: string;                    // 고유 식별자
  title?: string;                // 위젯 제목 (선택사항)
  position: Position;            // 위치 정보
  size: Size;                    // 크기 정보
  children?: React.ReactNode;    // 위젯 내용 컴포넌트
  className?: string;            // 추가 CSS 클래스 (선택사항)
  zIndex?: number;               // z-index 값 (선택사항)
  isVisible?: boolean;           // 표시 여부 (선택사항)
}

interface Position {
  x: number;                     // X 좌표 (px)
  y: number;                     // Y 좌표 (px)
}

interface Size {
  width: number;                 // 너비 (px)
  height: number;                // 높이 (px)
}
```

## 고급 사용법

### 성능 최적화

라이브러리는 드래그/리사이즈 중 불필요한 콜백 호출을 방지하여 성능을 최적화합니다:

```tsx
const handleLayoutsChange = (newLayouts: WidgetLayout[]) => {
  setLayouts(newLayouts);
  // 이 콜백은 마우스 업 시에만 호출됩니다
  // 드래그/리사이즈 중에는 호출되지 않아 성능이 향상됩니다
  saveToDatabase(newLayouts); // 예: 데이터베이스 저장
};
```

### 다양한 크기의 대시보드

```tsx
// 작은 대시보드
<WidgetDashboard 
  layouts={layouts}
  isEditMode={true}
  width={800}
  height={600}
  gridSize={20}
/>

// 고정 너비 컨테이너
<div style={{ width: '600px', height: '400px', margin: '0 auto', border: '1px solid #ccc' }}>
  <WidgetDashboard 
    layouts={layouts}
    isEditMode={true}
    width={600}
    height={400}
    gridSize={20}
  />
</div>

// 반응형 컨테이너 (사용자가 직접 구현)
const [containerSize, setContainerSize] = useState({ width: 1200, height: 800 });

useEffect(() => {
  const handleResize = () => {
    setContainerSize({
      width: window.innerWidth - 40, // 패딩 고려
      height: window.innerHeight - 100 // 헤더 고려
    });
  };
  
  window.addEventListener('resize', handleResize);
  handleResize(); // 초기 크기 설정
  
  return () => window.removeEventListener('resize', handleResize);
}, []);

<WidgetDashboard 
  layouts={layouts}
  isEditMode={true}
  width={containerSize.width}
  height={containerSize.height}
  gridSize={20}
/>
```

### 레이아웃 저장 및 복원

```tsx
// 레이아웃 저장
const saveLayouts = () => {
  localStorage.setItem('dashboard-layouts', JSON.stringify(layouts));
};

// 레이아웃 복원
const loadLayouts = () => {
  const saved = localStorage.getItem('dashboard-layouts');
  if (saved) {
    setLayouts(JSON.parse(saved));
  }
};

// 레이아웃 변경 시 자동 저장 (성능 최적화됨)
const handleLayoutsChange = (newLayouts: WidgetLayout[]) => {
  setLayouts(newLayouts);
  // 마우스 업 시에만 호출되므로 성능에 영향 없음
  saveLayouts();
};
```

### 동적 위젯 추가/제거

```tsx
const addWidget = () => {
  const newWidget: WidgetLayout = {
    id: `widget-${Date.now()}`,
    title: '새 위젯',
    position: { x: 0, y: 0 },
    size: { width: 200, height: 120 },
    children: <NewWidgetComponent />,
  };
  setLayouts([...layouts, newWidget]);
};

const removeWidget = (id: string) => {
  setLayouts(layouts.filter(layout => layout.id !== id));
};
```

## 그리드 시스템

- 모든 위젯은 20px 단위로 정확히 스냅됩니다
- 드래그와 리사이즈 모두 20px 단위로 움직입니다
- 격자 선에 완벽하게 정렬됩니다
- 성능 최적화로 부드러운 60fps 동작을 보장합니다

### 권장 위젯 크기

```tsx
// 작은 위젯 (20px 그리드에 맞춤)
size: { width: 100, height: 80 }   // 5x4 그리드

// 중간 위젯 (20px 그리드에 맞춤)
size: { width: 200, height: 160 }  // 10x8 그리드

// 큰 위젯 (20px 그리드에 맞춤)
size: { width: 300, height: 200 }  // 15x10 그리드

// 매우 큰 위젯 (20px 그리드에 맞춤)
size: { width: 400, height: 300 }  // 20x15 그리드

// 정사각형 위젯들
size: { width: 120, height: 120 }  // 6x6 그리드
size: { width: 200, height: 200 }  // 10x10 그리드
size: { width: 300, height: 300 }  // 15x15 그리드
```

## 주의사항

1. 각 위젯은 고유한 `id`를 가져야 합니다
2. 위치와 크기는 `gridSize`의 배수로 설정하는 것을 권장합니다
3. 위젯이 대시보드 경계를 벗어나지 않도록 자동으로 제한됩니다
4. 성능 최적화로 많은 위젯을 사용해도 부드럽게 동작합니다
5. `onLayoutsChange` 콜백은 마우스 업 시에만 호출됩니다
6. 반응형 지원은 사용자가 직접 구현해야 합니다 (width, height props 활용)

## 성능 특징

- **드래그/리사이즈 중**: 불필요한 콜백 호출 방지
- **마우스 업 시**: 한 번만 콜백 호출로 성능 최적화
- **useRef 기반**: DOM 직접 업데이트로 리렌더링 방지
- **60fps 보장**: 부드러운 사용자 경험

## 라이선스

MIT 라이선스

## 지원

문제가 있거나 기능 요청이 있으시면 [GitHub Issues](https://github.com/1rreplaceable/widget-dashboard/issues)에 등록해 주세요.

## 버전 히스토리

- **v1.0.12**: 성능 최적화 (useRef 기반 드래그/리사이즈)
- **v1.0.11**: 타입 정의 개선 및 빌드 경고 수정
- **v1.0.10**: 초기 안정 버전
