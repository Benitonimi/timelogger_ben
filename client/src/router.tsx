import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/app/layouts/SidebarLayout';

import SuspenseLoader from 'src/app/components/SuspenseLoader';

const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );


// Dashboards

const Crypto = Loader(lazy(() => import('src/app/views/dashboards/Crypto')));

// Applications

const Projects = Loader(
  lazy(() => import('src/app/views/applications/Projects'))
);
const Activities = Loader(
  lazy(() => import('src/app/views/applications/Activities'))
);


const routes: RouteObject[] = [
  {
    path: '',
    element: <SidebarLayout />,
    children: [
      {
        path: '/',
        element: <Crypto />
      },
      {
        path: 'overview',
        element: <Navigate to="/" replace />
      },
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="crypto" replace />
      },
      {
        path: 'crypto',
        element: <Crypto />
      },
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="projects" replace />
      },
      {
        path: 'projects',
        element: <Projects />
      },
      {
        path: 'activities',
        element: <Activities />
      },
    ]
  },
];

export default routes;
