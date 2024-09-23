import { lazy } from 'react';

const VisualizerPage = lazy(() => import('./VisualizerPage'));
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
      path: 'visualizer',
      element: <VisualizerPage />,
    },
  ],
};

export default ExplorerConfig;