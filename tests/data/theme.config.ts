import { ITheme } from '@/types';

export const testTheme: ITheme = {
  pageTitlePostfix: 'Hippo Digital',
  name: 'Medical certificate of cause of death',
  serviceName: '',
  logo: {
    src: '/theme/images/hippo-data-logo.webp',
    height: 70,
    width: 282,
    alt: 'NHSBSA.',
  },
  tagsColours: {
    blue: [],
    green: ['High value'],
    grey: [],
    orange: [],
    pink: [],
    purple: [],
    red: [],
    turquoise: [],
    yellow: ['Medium priority'],
  },
  headerMenu: [
    {
      content: 'Home',
      title: 'Home',
      link: '/',
    },
    {
      content: 'Features',
      title: 'All features of this project',
      link: '/features',
    },
  ],
  footerMenu: [
    {
      content: 'Kitchen sink',
      link: '/kitchen-sink',
      title: 'Get help creating content',
    },
    {
      content: 'Documentation',
      link: '/documentation',
      title: 'Search the document archives',
    },
  ],
};

export default testTheme;
