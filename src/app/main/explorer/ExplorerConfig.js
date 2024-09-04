import { lazy } from 'react';

const ExplorerPage = lazy(() => import('./ExplorerPage'));
const ExplorerConfig = {
  settings: {
    layout: {
      config: {
        footer: {
          display: false
        }
      },
    },
  },
  routes: [
    {
      path: 'explorer',
      element: <ExplorerPage />,
    },
  ],
};

export default ExplorerConfig;