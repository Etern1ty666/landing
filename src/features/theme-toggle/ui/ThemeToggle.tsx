import type { MouseEvent } from 'react';
import { useTheme } from '@/shared/lib/theme';
import { MoonIcon, SunIcon } from './icons';
import styles from './ThemeToggle.module.css';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const isLight = theme === 'light';
  const Icon = isLight ? SunIcon : MoonIcon;
  const label = isLight ? 'Включить тёмную тему' : 'Включить светлую тему';

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    toggleTheme({ clientX: event.clientX, clientY: event.clientY });
  };

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleClick}
      aria-label={label}
    >
      <span key={theme} className={styles.iconWrap}>
        <Icon />
      </span>
    </button>
  );
};
