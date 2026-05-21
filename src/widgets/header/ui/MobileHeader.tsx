import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';
import { EXTERNAL_LINKS } from '@/shared/config';
import { ThemeToggle } from '@/features/theme-toggle';
import { NAV_ITEMS } from '../model/nav-items';
import styles from './MobileHeader.module.css';

export const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLElement | null>(null);

  const close = () => setIsOpen(false);

  // Закрытие по клику вне меню и по Escape
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (wrapperRef.current && target && !wrapperRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <header
      ref={wrapperRef}
      className={`${styles.wrapper} ${isOpen ? styles.open : ''}`}
      aria-expanded={isOpen}
    >
      <div className={styles.topRow}>
        <NavLink to={ROUTES.home} className={styles.logo} onClick={close}>
          Novikov
        </NavLink>

        <button
          type="button"
          className={`${styles.burger} ${isOpen ? styles.burgerOpen : ''}`}
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={styles.menu} aria-hidden={!isOpen}>
        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={close}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.linkActive}` : styles.link
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.themeRow}>
          <ThemeToggle />
        </div>

        <a
          href={EXTERNAL_LINKS.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
          onClick={close}
        >
          Написать в Telegram
        </a>
      </div>
    </header>
  );
};
