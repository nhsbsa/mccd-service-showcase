import { ITheme } from '@/types';

export const theme: ITheme = {
  pageTitlePostfix: 'NHS Business Service Authority',
  name: 'Medical Certificate of Cause of Death (MCCD)',
  serviceName: '',
  logo: {
    src: '/theme/images/logo.svg',
    height: 48,
    width: 200,
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
      content: 'Alpha overview',
      link: '/',
      title: 'Showcase start page',
    },
    {
      content: 'Artefact archive',
      link: '/artefact-archive',
      title: 'Search the artefact archives',
    },
    {
      content: 'Beta backlog',
      link: '/beta-backlog',
      title: 'Explore the beta backlog',
    },
  ],
};

export default theme;
