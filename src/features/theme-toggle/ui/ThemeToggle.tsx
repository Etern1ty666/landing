import { useState, type MouseEvent } from 'react';
import { useTheme } from '@/shared/lib/theme';
import { MoonIcon, SunIcon } from './icons';
import styles from './ThemeToggle.module.css';

const BURST_DURATION = 400;

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [bursting, setBursting] = useState(false);

  const isLight = theme === 'light';
  const Icon = isLight ? SunIcon : MoonIcon;
  const label = isLight ? 'Включить тёмную тему' : 'Включить светлую тему';

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (bursting) return;
    setBursting(true);
    const coords = { clientX: event.clientX, clientY: event.clientY };

    window.setTimeout(() => {
      toggleTheme(coords);
    }, BURST_DURATION / 2);

    window.setTimeout(() => {
      setBursting(false);
    }, BURST_DURATION);
  };

  const className = [styles.button, bursting && styles.bursting]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      aria-label={label}
    >
      <span key={theme} className={styles.iconWrap}>
        <Icon />
      </span>
    </button>
  );
};
