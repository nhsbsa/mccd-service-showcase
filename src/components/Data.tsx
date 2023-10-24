'use client';

import React, {
  isValidElement, ReactNode, useEffect, useState,
} from 'react';
import { DataItem, DataType } from '@/lib/types';
import { filterData, filterFields } from '../lib/helpers/data';

type DataProps = {
    defaultData: DataType;
    url: string | undefined;
    include: DataItem;
    where: string;
    fields: string;
    children: React.ReactNode;
};

function ReadData({
  defaultData,
  url = '',
  include = {},
  fields = '',
  where = '',
  children,
}: DataProps) {
  const [data, setData] = useState<DataType>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let dataToSet: any;

        if (url) {
          const response = await fetch(url);
          dataToSet = await response.json();
        } else if (defaultData) {
          dataToSet = defaultData;
        } else {
          const response = await fetch('/api/data/site-data');
          dataToSet = await response.json();
        }

        if (where) {
          dataToSet = filterData(dataToSet, where);
        }

        if (fields) {
          dataToSet = filterFields(dataToSet, fields);
        }

        if (include) {
          if (Array.isArray(dataToSet)) {
            const ds = dataToSet.map((d) => ({ ...d, ...include }));
            dataToSet = ds;
          } else {
            dataToSet = [{ ...dataToSet, ...include }];
          }
        }

        setLoading(false);
        setData(dataToSet);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error fetching data:', err);
        setLoading(false);
        setError(true);
      }
    };

    if (!(data.length > 0) && loading) {
      fetchData();
    }
  }, [defaultData, url, where, fields, include, data, loading]);

  if (error) return <div><p className="govuk-body-s">Error loading data.</p></div>;
  if (loading) return <div><p className="govuk-body-s">Loading...</p></div>;

  return React.Children.map<ReactNode, ReactNode>(children, (c) => {
    if (isValidElement(c)) {
      // @ts-ignore
      return React.cloneElement(c, { data });
    }
    return React.cloneElement(c as React.ReactElement);
  });
}

export default ReadData;
