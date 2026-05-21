export type Theme = 'light' | 'dark';

export type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme, event?: { clientX: number; clientY: number }) => void;
  toggleTheme: (event?: { clientX: number; clientY: number }) => void;
};
