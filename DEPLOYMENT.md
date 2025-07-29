# npm 배포 가이드

## 📦 배포 준비

### 1. 의존성 설치

```bash
npm install
```

### 2. 라이브러리 빌드

```bash
npm run build:lib
```

이 명령어는 다음 파일들을 생성합니다:
- `dist/index.js` (CommonJS)
- `dist/index.esm.js` (ES Modules)
- `dist/index.d.ts` (TypeScript declarations)

### 3. 빌드 결과 확인

```bash
ls -la dist/
```

다음 파일들이 있어야 합니다:
```
dist/
├── index.js
├── index.esm.js
├── index.d.ts
└── index.js.map
```

## 🚀 npm 배포

### 1. npm 로그인

```bash
npm login
```

### 2. 패키지 정보 확인

```bash
npm pack --dry-run
```

### 3. 배포 실행

```bash
npm publish
```

### 4. 배포 확인

```bash
npm view widget-dashboard
```

## 🔄 업데이트 배포

### 1. 버전 업데이트

```bash
# 패치 버전 (1.0.0 → 1.0.1)
npm version patch

# 마이너 버전 (1.0.0 → 1.1.0)
npm version minor

# 메이저 버전 (1.0.0 → 2.0.0)
npm version major
```

### 2. 재배포

```bash
npm run build:lib
npm publish
```

## 📋 배포 체크리스트

- [ ] `package.json`의 모든 필드가 올바르게 설정됨
- [ ] `README.md`가 완성됨
- [ ] `LICENSE` 파일이 포함됨
- [ ] `.npmignore`가 올바르게 설정됨
- [ ] TypeScript 타입 정의가 생성됨
- [ ] 라이브러리가 정상적으로 빌드됨
- [ ] npm 계정에 로그인됨
- [ ] 패키지 이름이 사용 가능함

## 🐛 문제 해결

### 빌드 오류

```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install

# TypeScript 캐시 클리어
rm -rf dist/
npm run build:lib
```

### 배포 오류

```bash
# npm 캐시 클리어
npm cache clean --force

# 패키지 정보 확인
npm view widget-dashboard
```

### 타입 정의 문제

```bash
# TypeScript 설정 확인
npx tsc --noEmit

# 타입 정의 재생성
rm -rf dist/
npm run build:lib
```

## 📚 추가 리소스

- [npm 배포 가이드](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Rollup 설정 가이드](https://rollupjs.org/guide/en/)
- [TypeScript 라이브러리 가이드](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)

---

**성공적인 배포를 위한 팁:**

1. **테스트**: 배포 전에 로컬에서 패키지를 테스트하세요
2. **문서화**: README.md를 완성하고 예제를 포함하세요
3. **버전 관리**: 의미있는 버전 번호를 사용하세요
4. **태그**: Git 태그를 생성하여 버전을 추적하세요 