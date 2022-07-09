import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/app/layouts/SidebarLayout';

import SuspenseLoader from 'src/app/components/SuspenseLoader';
import DashboardTimelogger from 'src/app/views/dashboards/Timelogger';

const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );


// Dashboards

const Timelogger = Loader(lazy(() => import('src/app/views/dashboards/Timelogger')));

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
        element: <Timelogger />
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
        element: <Navigate to="timelogger" replace />
      },
      {
        path: 'timelogger',
        element: <DashboardTimelogger />
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
