import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';
import { EXTERNAL_LINKS } from '@/shared/config';
import { ThemeToggle } from '@/features/theme-toggle';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { to: ROUTES.projects, label: 'Проекты' },
  { to: ROUTES.contacts, label: 'Контакты' },
];

export const Header = () => {
  return (
    <header className={styles.wrapper}>
      <div className={styles.left}>
        <NavLink to={ROUTES.home} className={styles.logo}>
          Novikov
        </NavLink>
        <ThemeToggle />
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.linkActive}` : styles.link
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <a
        href={EXTERNAL_LINKS.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.action}
      >
        Написать в Telegram
      </a>
    </header>
  );
};
