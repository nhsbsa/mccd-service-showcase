'use client';

import React, { useCallback, useEffect, useState } from 'react';
import * as _ from 'lodash';
import GridRow from '@/components/GridRow';
import GridColumn from '@/components/GridColumn';
import { DataItem, DataType } from '@/types';
import Link from 'next/link';
import { kebabCase } from 'lodash';

type TSortableList = {
  sortBy?: DataItem
  titleField?: string
  linkField?: string
  sortText?: string
  data?: DataType
}
function SortableLists({
  sortBy = {},
  sortText = 'Sort by',
  data = [],
  titleField = 'title',
  linkField = '',
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
        <GridColumn key={`group-${i + 1}`} width="1/4">
          <h3 className="govuk-heading-m">{_.capitalize(group[0] || '')}</h3>
          <ul className="govuk-list govuk-list--spaced govuk-!-padding-top-4">
            {group[1]
              .map((groupItem, index:number) => (
                <li key={`list-item-${index + 1}`}>
                  {groupItem[linkField]
                    ? <Link data-testid={kebabCase(groupItem[titleField])} href={`${groupItem[linkField]}`} title={groupItem[titleField]}>{groupItem[titleField]}</Link>
                    : groupItem[titleField]}
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
