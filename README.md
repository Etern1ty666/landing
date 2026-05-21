# Landing

React + TypeScript + Vite.

## Стек

- React 18
- TypeScript
- Vite

## Требования

- Node.js >= 18
- npm (или pnpm/yarn)

## Установка

```bash
npm install
```

## Запуск в режиме разработки

```bash
npm run dev
```

Приложение откроется по адресу `http://localhost:5173`.

## Сборка

```bash
npm run build
```

Готовый бандл будет в папке `dist/`.

## Превью прод-сборки

```bash
npm run preview
```

## Структура проекта

```
.
├── index.html              # HTML-точка входа
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── src/
    ├── main.tsx            # точка входа React
    ├── App.tsx             # корневой компонент
    ├── vite-env.d.ts
    └── pages/
        └── HomePage.tsx    # страница Hello world
```
