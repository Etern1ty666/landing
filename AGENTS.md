# AGENTS.md

Универсальный файл инструкций для AI-ассистентов (Codex, Cursor, Aider, Continue и др.), читающих `AGENTS.md`.

> **Главный источник правды — [`CLAUDE.md`](./CLAUDE.md).** Этот файл — краткая выжимка. При расхождении приоритет у `CLAUDE.md`.

---

## Стек

React 18 + TypeScript (strict) + Vite + React Router.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Архитектура — Feature-Sliced Design (FSD)

Проект строго следует FSD. Документация: https://feature-sliced.design/

### Слои

```
src/
├── app/       # инициализация (провайдеры, роутер, стили)
├── pages/     # страницы-роуты
├── widgets/   # самостоятельные UI-блоки
├── features/  # пользовательские действия
├── entities/  # бизнес-сущности
└── shared/    # ui-kit, hooks, lib, api, types, constants, assets
```

### Правило импортов (ЖЁСТКО)

Импорт только **сверху вниз**:

- `app` → `pages` → `widgets` → `features` → `entities` → `shared`
- Слайсы одного слоя **не импортируют друг друга**.
- `shared` не знает ни о чём из проекта.

### Слайсы и сегменты

Каждый слайс (`widgets/header`, `features/subscribe-form`) внутри имеет сегменты:
`ui/`, `model/`, `api/`, `lib/`, `config/` + обязательный `index.ts` (Public API).

### Public API

Импортируй слайс **только через `index.ts`**:

```ts
// ✅
import { Header } from '@/widgets/header';

// ❌
import { Header } from '@/widgets/header/ui/Header';
```

### Алиас

Все импорты между слоями — через `@/*` → `src/*`.

## Куда что класть

| Что                              | Куда                                 |
|----------------------------------|--------------------------------------|
| Страница-роут                    | `src/pages/<name>/`                  |
| Большой блок UI                  | `src/widgets/<name>/`                |
| Форма/действие                   | `src/features/<name>/`               |
| Бизнес-сущность                  | `src/entities/<name>/`               |
| UI-примитив (Button, Input)      | `src/shared/ui/<Component>/`         |
| Хук                              | `src/shared/hooks/`                  |
| Утилита                          | `src/shared/lib/`                    |
| Конфиг роутера                   | `src/app/router/`                    |
| Провайдер                        | `src/app/providers/`                 |

## Конвенции

- Папки/слайсы: `kebab-case`. Компоненты: `PascalCase`. Хуки: `useX.ts`.
- Только функциональные компоненты.
- TypeScript strict, без `any`.
- Не добавляй комментарии без необходимости.
- Не создавай `utils/`, `helpers/`, `common/` в корне `src/` — это нарушает FSD.

## Стили

- CSS Modules. Дизайн-токены — CSS-переменные в `src/app/styles/global.css`.
- Использовать только токены (`var(--...)`), не хардкодить значения в компонентах.

## Типографика — строгое правило

Только три варианта текста. Других быть не должно.

```tsx
import { Text } from '@/shared/ui';

<Text variant="heading">Заголовок</Text>   // жирный, крупный
<Text variant="body">Основной текст</Text>  // обычный
<Text variant="muted">Подпись</Text>        // серый, мелкий
```

Семантику меняй через `as`: `<Text variant="heading" as="h2">…</Text>`.

**Запрещено:** голые `<h1>/<p>` с собственными `font-size/font-weight`, четвёртый размер, локальные переопределения шрифтов.

## Поведение

- Не нарушай FSD ради скорости. Если непонятно куда класть — спроси.
- Не создавай файлы, пока пользователь не подтвердил подход.
- Язык общения: русский. Язык кода: английский.

Подробности, чек-листы и анти-паттерны — в [`CLAUDE.md`](./CLAUDE.md).
