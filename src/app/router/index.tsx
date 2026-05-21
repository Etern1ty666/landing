import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/widgets/layout';
import { HomePage } from '@/pages/home';
import { ProjectsPage } from '@/pages/projects';
import { ContactsPage } from '@/pages/contacts';
import { ROUTES } from '@/shared/constants';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: ROUTES.home, element: <HomePage /> },
      { path: ROUTES.projects, element: <ProjectsPage /> },
      { path: ROUTES.contacts, element: <ContactsPage /> },
    ],
  },
]);
