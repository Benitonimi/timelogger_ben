import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/app/layouts/SidebarLayout';
import BaseLayout from 'src/app/layouts/BaseLayout';

import SuspenseLoader from 'src/app/components/SuspenseLoader';

const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

const Overview = Loader(lazy(() => import('src/app/views/overview')));

// Dashboards

const Crypto = Loader(lazy(() => import('src/app/views/dashboards/Crypto')));

// Applications

const Messenger = Loader(
  lazy(() => import('src/app/views/applications/Messenger'))
);
const Transactions = Loader(
  lazy(() => import('src/app/views/applications/Transactions'))
);
const UserProfile = Loader(
  lazy(() => import('src/app/views/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/app/views/applications/Users/settings'))
);

// Components

const Buttons = Loader(
  lazy(() => import('src/app/views/pages/Components/Buttons'))
);
const Modals = Loader(
  lazy(() => import('src/app/views/pages/Components/Modals'))
);
const Accordions = Loader(
  lazy(() => import('src/app/views/pages/Components/Accordions'))
);
const Tabs = Loader(lazy(() => import('src/app/views/pages/Components/Tabs')));
const Badges = Loader(
  lazy(() => import('src/app/views/pages/Components/Badges'))
);
const Tooltips = Loader(
  lazy(() => import('src/app/views/pages/Components/Tooltips'))
);
const Avatars = Loader(
  lazy(() => import('src/app/views/pages/Components/Avatars'))
);
const Cards = Loader(lazy(() => import('src/app/views/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('src/app/views/pages/Components/Forms')));

// Status

const Status404 = Loader(
  lazy(() => import('src/app/views/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/app/views/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/app/views/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/app/views/pages/Status/Maintenance'))
);

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Overview />
      },
      {
        path: 'overview',
        element: <Navigate to="/" replace />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
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
      {
        path: 'messenger',
        element: <Messenger />
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="transactions" replace />
      },
      {
        path: 'transactions',
        element: <Transactions />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
      {
        path: 'buttons',
        element: <Buttons />
      },
      {
        path: 'modals',
        element: <Modals />
      },
      {
        path: 'accordions',
        element: <Accordions />
      },
      {
        path: 'tabs',
        element: <Tabs />
      },
      {
        path: 'badges',
        element: <Badges />
      },
      {
        path: 'tooltips',
        element: <Tooltips />
      },
      {
        path: 'avatars',
        element: <Avatars />
      },
      {
        path: 'cards',
        element: <Cards />
      },
      {
        path: 'forms',
        element: <Forms />
      }
    ]
  }
];

export default routes;
