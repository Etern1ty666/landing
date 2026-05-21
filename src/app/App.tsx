import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/shared/lib/theme';
import { router } from './router';

export const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
