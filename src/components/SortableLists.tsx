'use client';

import React, { useCallback, useEffect, useState } from 'react';
import * as _ from 'lodash';
import { GridRow, GridColumn } from '@/components/GridLayout';
import { DataItem, DataType } from '@/types';
import Link from 'next/link';
import { kebabCase } from 'lodash';

// This is due to Ben's poor Typescript. To be improved. :-O
const Widths = {
  '1/4': 'govuk-grid-column-one-quarter',
  '1/3': 'govuk-grid-column-one-third',
  '2/3': 'govuk-grid-column-two-thirds',
  '1/2': 'govuk-grid-column-one-half',
  '3/4': 'govuk-grid-column-three-quarters',
  full: 'govuk-grid-column-full',
};

type TSortableList = {
  sortBy?: DataItem
  titleField?: string
  linkField?: string
  sortText?: string
  data?: DataType
  className?: string
  priority?: string
  sizing?: string
}
function SortableLists({
  sortBy = {},
  sortText = 'Sort by',
  data = [],
  titleField = 'title',
  linkField = '',
  className = '',
  priority = 'priority',
  sizing = 'sizing',
}:TSortableList) {
  const [listData, setListData] = useState<DataType>([]);
  // eslint-disable-next-line max-len
  const [searchResults, setSearchResults] = useState<Array<[string, { slug: string[]; title: string }[]]>>([]);

  const groupBy = useCallback(<K extends keyof DataItem>(d: DataItem[], g: K) => {
    if (!(d?.length > 0)) return;
    const groupedData = d.reduce((accumulator, item) => {
      const category = item[g] as string;
      if (category !== undefined && typeof category === 'string') {
        const cat: string = category.toLowerCase();
        const group: any = accumulator[cat] || [];
        accumulator[cat] = [...group, item];
      }
      return accumulator;
    }, {} as Record<string, DataItem[]>);

    const sortOrder = (sortBy[g] as string[]) || [];
    const sorted = Object.entries(groupedData).sort(
      (a, b) => sortOrder.indexOf(a[0]) - sortOrder.indexOf(b[0]),
    );
    setSearchResults(sorted as Array<[string, { slug: string[]; title: string }[]]>);
  }, [sortBy]);

  useEffect(() => {
    if (data?.length > 0) setListData(data);
  }, [data]);

  useEffect(() => {
    const sortKey = Object.keys(sortBy)[0];
    groupBy(listData, sortKey);
  }, [listData, sortBy, groupBy]);

  // I'm sure there's a better way to do this
  let colWidth: keyof typeof Widths = '1/2';
  colWidth = searchResults.length === 3 ? '1/3' : colWidth;
  colWidth = searchResults.length > 3 ? '1/4' : colWidth;

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const sortValue = e.target.value;
    groupBy(listData, sortValue);
  };

  const makeSort = () => (
    <div key="sort" className="govuk-form-group">
      <label className="govuk-label" htmlFor="sort">
        {sortText}
      </label>
      <select className="govuk-select" id="sort" name="sort" onChange={handleSelect}>
        <option value="" disabled hidden>{sortText}</option>
        {Object.keys(sortBy).map((v) => {
          if (v.includes(':')) {
            const c = v.split(':');
            const value = c[1];
            const key = c[0];
            return <option key={v} value={value}>{_.capitalize(key)}</option>;
          }
          return <option key={v} value={_.camelCase(v)}>{_.capitalize(v)}</option>;
        })}
      </select>
    </div>
  );

  const makeLists = () => (searchResults ? (
    <GridRow>
      {searchResults.map((group, i) => (
        <GridColumn key={`group-${i + 1}`} className={`group-${i + 1}`} width={colWidth}>
          <h3 className="govuk-heading-m">{_.capitalize(group[0] || '')}</h3>
          <ul className={`govuk-list govuk-list--spaced govuk-!-padding-top-4 ${className}`}>
            {group[1]
              .map((groupItem, index:number) => (
                <li key={`list-item-${index + 1}`} data-priority={groupItem[priority]} data-sizing={groupItem[sizing]}>
                  {groupItem[linkField]
                    ? <Link data-testid={kebabCase(groupItem[titleField])} href={`${groupItem[linkField]}`} title={groupItem[titleField]}>{groupItem[titleField]}</Link>
                    : groupItem[titleField]}
                  <div className="tags">
                    <strong className="govuk-tag priority">
                      {`${groupItem[priority]}`}
                    </strong>
                    <strong className="govuk-tag sizing">
                      {`${groupItem[sizing]}`}
                    </strong>
                  </div>
                </li>
              ))}
          </ul>
        </GridColumn>
      ))}
    </GridRow>
  )
    : null);
  return (listData?.length > 0
    ? (
      <section>
        {makeSort()}
        {makeLists()}
      </section>
    )
    : <p className="govuk-body-s">No data</p>
  );
}
export default SortableLists;
