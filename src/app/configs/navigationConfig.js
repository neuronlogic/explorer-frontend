import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'visualizer-component',
    title: 'Visualizer',
    // translate: 'Explorer',
    type: 'item',
    icon: 'heroicons-outline:view-grid',
    url: 'visualizer',
  },
  {
    id: 'leader-board-component',
    title: 'Leader Board',
    // translate: 'Explorer',
    type: 'item',
    icon: 'heroicons-outline:chart-bar',
    url: 'leader-board',
  },
];

export default navigationConfig;
