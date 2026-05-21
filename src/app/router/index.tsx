import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/main-layout';
import { HomePage } from '@/pages/home';
import { ProjectsPage } from '@/pages/projects';
import { NewsPage } from '@/pages/news';
import { ContactsPage } from '@/pages/contacts';
import { ROUTES } from '@/shared/constants';

export const router = createBrowserRouter(
  [
    {
      element: <MainLayout />,
      children: [
        { path: ROUTES.home, element: <HomePage /> },
        { path: ROUTES.projects, element: <ProjectsPage /> },
        { path: ROUTES.news, element: <NewsPage /> },
        { path: ROUTES.contacts, element: <ContactsPage /> },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);
