import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { ThemeContext } from './ThemeContext';
import type { Theme } from './types';

const STORAGE_KEY = 'theme';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme);
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

const runWithViewTransition = (
  apply: () => void,
  event?: { clientX: number; clientY: number },
) => {
  const doc = document as ViewTransitionDocument;

  if (!doc.startViewTransition || !event) {
    apply();
    return;
  }

  const { clientX: x, clientY: y } = event;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const transition = doc.startViewTransition(apply);

  transition.ready
    .then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 280,
          easing: 'ease-out',
          pseudoElement: '::view-transition-new(root)',
        },
      );
    })
    .catch(() => {
      /* предыдущая транзишн была заменена новой — это норма при спаме */
    });
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // Источник правды для «текущей темы» при быстрых кликах — ref, который
  // обновляется СИНХРОННО до того как React успеет перерендерить. Без него
  // несколько кликов подряд читают одно и то же стейл-значение из замыкания.
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Подписка на системную тему: если пользователь не выбрал тему руками
  // (нет записи в localStorage) — следуем за ОС в реальном времени.
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      if (window.localStorage.getItem(STORAGE_KEY) !== null) return;
      const next: Theme = event.matches ? 'dark' : 'light';
      themeRef.current = next;
      setThemeState(next);
    };
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  const setTheme = useCallback<
    (next: Theme, event?: { clientX: number; clientY: number }) => void
  >((next, event) => {
    // Синхронно фиксируем «текущее» значение до планирования View Transition,
    // чтобы следующий клик в том же тике видел свежий ref.
    themeRef.current = next;
    window.localStorage.setItem(STORAGE_KEY, next);

    runWithViewTransition(() => {
      setThemeState(next);
      applyTheme(next);
    }, event);
  }, []);

  const toggleTheme = useCallback<
    (event?: { clientX: number; clientY: number }) => void
  >(
    (event) => {
      const next: Theme = themeRef.current === 'light' ? 'dark' : 'light';
      setTheme(next, event);
    },
    [setTheme],
  );

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
