'use client';

import React, {
  isValidElement, ReactNode, useState,
} from 'react';
import useWindowDimensions from '@/lib/hooks/window-size';
import { DataType } from '@/types';
import { camelCase } from 'lodash';
import { useRouter } from 'next/navigation';

interface ITabPanel {
  id: string;
  title: string;
  selected: string;
  children: ReactNode;
  data?: DataType;
}

export const TabPanel = ({
  id, title, selected, children, data,
}: ITabPanel) => (
  <div
    id={id}
    className={`govuk-tabs__panel ${
      selected !== id ? 'govuk-tabs__panel--hidden' : ''
    }`}
  >
    <h2 className="govuk-heading-l">{title}</h2>
    {React.Children.map<ReactNode, ReactNode>(children, (c) => {
      if (isValidElement(c)) {
        // @ts-ignore
        return React.cloneElement(c, { data });
      }
      return null;
    })}
  </div>
);

interface ITabHeader {
  // eslint-disable-next-line no-unused-vars
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  id: string;
  title: string;
  selected: string;
}

const TabHeader = ({
  onClick, id, title, selected,
}: ITabHeader) => (
  <li
    className={`govuk-tabs__list-item ${
      id === selected ? 'govuk-tabs__list-item--selected' : ''
    }`}
  >
    <a
      className="govuk-tabs__tab"
      onClick={(e) => onClick(e, id)}
      href={`#${id}`}
      id={`tab-${id}`}
      role="tab"
      aria-controls={id}
      aria-selected={id === selected}
      tabIndex={0}
    >
      {title}
    </a>
  </li>
);

interface ITab {
  title: string;
  data?: DataType;
  children?: ReactNode;
}

export const Tabs = ({ title, data, children = null }: ITab) => {
  const d = useWindowDimensions();
  const router = useRouter();
  const partitionChildren = (
    arr: React.ReactNode[],
    // eslint-disable-next-line no-unused-vars
    cond: (element: React.ReactNode) => boolean,
  ) => arr.reduce(
    (
      // eslint-disable-next-line max-len
      result: { headers: { id: string; title: string }[]; panels: { id: string; title: string; children: React.ReactNode }[] },
      element: React.ReactNode,
      index: number,
    ) => {
      if (cond(element)) {
        const tabPanel = element as React.ReactElement<ITabPanel>;
        const uniqueId = `${camelCase(tabPanel.props.title)}${index}`;
        result.headers.push({ id: uniqueId, title: tabPanel.props.title });
        result.panels.push({
          id: uniqueId,
          title: tabPanel.props.title,
          children: tabPanel.props.children,
        });
      }
      return result;
    },
    { headers: [], panels: [] },
  );
  const isTabPanel = (element: React.ReactNode): element is React.ReactElement<ITabPanel> => (
    React.isValidElement(element)
    && element.type === TabPanel
  );

  const { headers, panels } = partitionChildren(
    React.Children.toArray(children),
    (e) => isTabPanel(e),
  );

  const [selected, setSelected] = useState<string>(() => (headers.length > 0 ? headers[0].id : ''));

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setSelected(id);
    if (d.width < 640) {
      router.push(`#${id}`);
    }
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
            id={h.id}
            title={h.title}
          />
        ))}
      </ul>
      {panels.map((p, i) => (
        <TabPanel
          data={data}
          selected={selected}
          key={`panel${i + 1}`}
          id={p.id}
          title={p.title}
        >
          {p.children}
        </TabPanel>
      ))}
    </div>
  );
};
