'use client';

import React, {
  isValidElement, ReactNode, useState,
} from 'react';
import Link from 'next/link';
import useWindowDimensions from '@/lib/hooks/window-size';
import { DataType } from '@/lib/types';

interface TabProps {
  title: string;
  children: React.ReactNode
  data: DataType
}

interface TabHeaderProps {
  id: string
  title: string
  selected: string
  isMobile: boolean
  // eslint-disable-next-line no-unused-vars
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void
}

interface TabPanelProps {
  id: string
  title: string
  children: React.ReactNode
  selected: string;
  data: DataType
}

export function TabPanel({
  id, title, selected, children, data,
}: TabPanelProps) {
  return (
    <div
      id={id}
      className={`govuk-tabs__panel ${
        selected !== id ? 'govuk-tabs__panel--hidden' : ''
      }`}
    >
      <h2 className="govuk-heading-l">{title}</h2>
      {React.Children
        .map<ReactNode, ReactNode>(children, (c) => {
          if (isValidElement(c)) {
            // @ts-ignore
            return React.cloneElement(c, { data });
          }
          return React.cloneElement(c as React.ReactElement);
        })}
    </div>
  );
}

export function TabHeader({
  onClick, id, title, selected, isMobile,
}: TabHeaderProps) {
  return (
    <li
      className={`govuk-tabs__list-item ${
        id === selected ? 'govuk-tabs__list-item--selected' : ''
      }`}
    >
      <Link
        className="govuk-tabs__tab"
        onClick={(e) => onClick(e, id)}
        href={`#${id}`}
        id={`tab-${id}`}
        scroll={isMobile}
        role="tab"
        aria-controls={id}
        aria-selected={id === selected}
        tabIndex={0}
      >
        {title}
      </Link>
    </li>
  );
}

export function Tabs({ title, data, children }: TabProps) {
  const d = useWindowDimensions();
  const partitionChildren = (
    arr: React.ReactNode[],
    // eslint-disable-next-line no-unused-vars
    cond: (element: React.ReactNode) => boolean,
  ) => arr.reduce(
    (result: [React.ReactNode[], React.ReactNode[]], element: React.ReactNode) => {
      result[cond(element) ? 0 : 1].push(element);
      return result;
    },
    [[], []],
  );

  const [headers, panels] = partitionChildren(
    React.Children.toArray(children),
    (e) => React.isValidElement(e) && e.type === TabHeader,
  );

  const [selected, setSelected] = useState<string>(
    (headers[0] as React.ReactElement<TabHeaderProps>)?.props.id || '',
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setSelected(id);
  };

  return (
    <div className="govuk-tabs" data-module="govuk-tabs">
      <h2 className="govuk-tabs__title">{title}</h2>
      <ul className="govuk-tabs__list">
        {headers.map((h, i) => (
          <TabHeader
            selected={selected}
            key={`tabHeader${i + 1}`}
            onClick={handleClick}
            isMobile={d.width < 640}
            id={(h as React.ReactElement<TabHeaderProps>).props.id}
            title={(h as React.ReactElement<TabHeaderProps>).props.title}
          />
        ))}
      </ul>
      {panels.map((p, i) => (
        <TabPanel
          data={data}
          selected={selected}
          key={`panel${i + 1}`}
          id={(p as React.ReactElement<TabPanelProps>).props.id}
          title={(p as React.ReactElement<TabPanelProps>).props.title}
        >
          {React.Children
            .map<ReactNode, ReactNode>((p as React.ReactElement<TabPanelProps>)
              .props.children, (c) => {
              if (isValidElement(c)) {
                // @ts-ignore
                return React.cloneElement(c, { data });
              }
              return React.cloneElement(c as React.ReactElement);
            })}
        </TabPanel>
      ))}
    </div>
  );
}
