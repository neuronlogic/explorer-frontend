import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'explorer-component',
    title: 'Explorer',
    translate: 'Explorer',
    type: 'item',
    icon: 'heroicons-outline:view-grid',
    url: 'explorer',
  },
];

export default navigationConfig;
