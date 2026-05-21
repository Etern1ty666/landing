import { useState, type MouseEvent } from 'react';
import { useTheme, type Theme } from '@/shared/lib/theme';
import { MoonIcon, SunIcon } from './icons';
import styles from './ThemeToggle.module.css';

const OPTIONS: { value: Theme; label: string; icon: () => JSX.Element }[] = [
  { value: 'light', label: 'Светлая тема', icon: SunIcon },
  { value: 'dark', label: 'Тёмная тема', icon: MoonIcon },
];

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [rippling, setRippling] = useState<Theme | null>(null);

  const handleClick = (next: Theme) => (event: MouseEvent<HTMLButtonElement>) => {
    if (next === theme) return;
    setRippling(next);
    window.setTimeout(() => setRippling(null), 600);
    setTheme(next, { clientX: event.clientX, clientY: event.clientY });
  };

  return (
    <div className={styles.group} role="group" aria-label="Переключение темы">
      {OPTIONS.map(({ value, label, icon: Icon }) => {
        const isActive = theme === value;
        const className = [
          styles.button,
          isActive && styles.buttonActive,
          rippling === value && styles.rippling,
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={value}
            type="button"
            className={className}
            onClick={handleClick(value)}
            aria-label={label}
            aria-pressed={isActive}
          >
            <Icon />
          </button>
        );
      })}
    </div>
  );
};
