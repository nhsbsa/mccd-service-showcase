import { ITheme } from '@/types';

export const theme: ITheme = {
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
  ],
  footerMenu: [
    {
      content: 'Kitchen sink',
      link: '/kitchen-sink',
      title: 'Get help creating content',
    },
    {
      content: 'Artefact archive',
      link: '/artefact-archive',
      title: 'Search the document archives',
    },
    {
      content: 'Beta backlog',
      link: '/beta-backlog',
      title: 'Search the document archives',
    },
  ],
};

export default theme;
