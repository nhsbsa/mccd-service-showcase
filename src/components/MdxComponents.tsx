/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import _ from 'lodash';
// eslint-disable-next-line import/no-named-as-default
import Accordion, { AccordionSection } from '@/components/Accordion';
import BackLink from '@/components/BackLink';
import Breadcrumbs from '@/components/Breadcrumbs';
import Details from '@/components/Details';
import Link from '@/components/Link';
import { GridRow, GridColumn } from '@/components/GridLayout';
import Heading from '@/components/Heading';
import InsetText from '@/components/InsetText';
import Pagination from '@/components/Pagination';
import FacetSearch from '@/components/FacetSearch';
import SortableLists from '@/components/SortableLists';
import Summary, { SummaryEntry } from '@/components/Summary';
import Table, { TableHeader, TableRow, TableCell } from '@/components/Table';
import { Tag, TagList } from '@/components/Tag';
import { Tabs, TabPanel } from '@/components/Tabs';
import Video from '@/components/Video';
import WarningCallout from '@/components/WarningCallout';
import LeadParagraph from '@/components/LeadParagraph';
import ReadData from '@/components/Data';
import { MDXComponents } from 'mdx/types';
import Zoom from '@/components/Zoom';
import Image from './Image';

interface MDXProps {
  [key: string]: any
}

export function H1(props:MDXProps) {
  return <h1 id={_.kebabCase(props.children)} className="govuk-heading-xl" {...props}>{props.children}</h1>;
}
export function H2(props:MDXProps) {
  return <h2 id={_.kebabCase(props.children)} className="govuk-heading-l">{props.children}</h2>;
}
export function H3(props:MDXProps) {
  return <h3 id={_.kebabCase(props.children)} className="govuk-heading-m">{props.children}</h3>;
}
export function H4(props:MDXProps) {
  return <h4 id={_.kebabCase(props.children)} className="govuk-heading-s">{props.children}</h4>;
}
export function H5(props:MDXProps) {
  return <h5 id={_.kebabCase(props.children)} className="govuk-heading-xs">{props.children}</h5>;
}
export function HR() {
  return <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />;
}
export function UL(props:MDXProps) {
  return <ul className="govuk-list govuk-list--bullet">{props.children}</ul>;
}
export function OL(props:MDXProps) {
  return <ol className="govuk-list govuk-list--number">{props.children}</ol>;
}
interface MDXImage {
  src: string
  alt: string
}
export function Img({
  src = '',
  alt = '',
}:MDXImage) {
  return <Image src={src} alt={alt} />;
}
export function Blockquote(children:MDXProps) {
  return <blockquote className="govuk-inset-text" {...children} />;
}
interface MDXLink extends MDXProps {
  href: string
}
export function A({ href, children }:MDXLink) {
  return <Link href={href}>{children}</Link>;
}
interface MDXLabel extends MDXProps {
  htmlFor: string
  className: string
}
export function Label({ htmlFor = '', className = '', children }:MDXLabel) {
  return <label htmlFor={htmlFor} className={className}>{children}</label>;
}
export function Steps(props:MDXProps) {
  return <ul className="govuk-list steps">{props.children}</ul>;
}
export function Small(props:MDXProps) {
  return <small className="govuk-body govuk-body-s">{props.children}</small>;
}
export function Paragraph(props:MDXProps) {
  return <p className="govuk-body" {...props} />;
}
export const MdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  Small,
  p: Paragraph,
  Accordion,
  AccordionSection,
  blockquote: Blockquote,
  Breadcrumbs,
  Details,
  hr: HR,
  img: Img,
  ul: UL,
  ol: OL,
  a: A,
  Label,
  Steps,
  FacetSearch,
  GridRow,
  GridColumn,
  Heading,
  InsetText,
  LeadParagraph,
  Pagination,
  ReadData,
  SortableLists,
  Summary,
  SummaryEntry,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  Tabs,
  TabPanel,
  Tag,
  TagList,
  Video,
  BackLink,
  WarningCallout,
  Zoom,
} as MDXComponents;
