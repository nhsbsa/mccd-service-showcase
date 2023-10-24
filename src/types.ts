export type DataItem = {
  [key: string]: string | number | boolean | null | string[] | number[] | DataItem | null;
};
export type DataType = DataItem[]

export type TMenuItem = {
  content: string;
  link: string;
  title: string;
}

export interface ITheme {
  pageTitlePostfix: string;
  footerMenu: (TMenuItem | TMenuItem)[];
  headerMenu: (TMenuItem | TMenuItem)[];
  name: string;
  tagsColours: {
    [key: string]: string[]
  }
  logo: { src: string | null; width: number; alt: string; height: number };
  serviceName: string
}
