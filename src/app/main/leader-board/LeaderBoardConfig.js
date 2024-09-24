import { lazy } from 'react';

const LeaderBoardPage = lazy(() => import('./LeaderBoardPage'));

const LeaderBoardConfig = {
  settings: {
    layout: {
      config: {
        footer: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: 'leader-board',
      element: <LeaderBoardPage />,
    },
  ],
};

export default LeaderBoardConfig;
