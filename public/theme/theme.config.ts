import { ITheme } from '@/types';

export const theme: ITheme = {
  pageTitlePostfix: 'NHS Business Service Authority',
  name: 'Medical Certificate of Cause of Death (MCCD)',
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
      content: 'Artefact archive',
      link: '/artefact-archive',
      title: 'Search the artefact archives',
    },
    {
      content: 'Beta backlog',
      link: '/beta-backlog',
      title: 'Explore the beta backlog',
    },
    {
      content: 'Kitchen sink',
      link: '/kitchen-sink',
      title: 'View components available for this showcase site',
    },
  ],
};

export default theme;
