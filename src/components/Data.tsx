'use client';

import React, {
  isValidElement, ReactNode, useEffect, useState,
} from 'react';
import { DataItem, DataType } from '@/types';
import { filterData, filterFields } from '../lib/helpers/data';

type DataProps = {
    apiEndpoint?: string | undefined;
    include?: DataItem;
    where?: string;
    fields?: string;
    children?: React.ReactNode;
};

const ReadData = ({
  apiEndpoint = '',
  include = {},
  fields = '',
  where = '',
  children,
}: DataProps) => {
  const [data, setData] = useState<DataType>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let dataToSet: any;

        if (apiEndpoint) {
          const response = await fetch(apiEndpoint);
          dataToSet = await response.json();
        } else {
          const response = await fetch('/api/data/site-data');
          dataToSet = await response.json();
        }

        if (!Array.isArray(dataToSet)) {
          dataToSet = [dataToSet];
        }

        if (where) {
          dataToSet = filterData({
            data: dataToSet,
            searchCriteria: where,
          });
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
        setLoading(false);
        setError(true);
      }
    };

    if (!(data.length > 0) && loading) {
      fetchData();
    }
  }, [apiEndpoint, where, fields, include, data, loading]);

  if (error) return <div><p className="govuk-body-s">Error loading data.</p></div>;
  if (loading) return <div><p className="govuk-body-s">Loading...</p></div>;

  return React.Children.map<ReactNode, ReactNode>(children, (c) => {
    if (isValidElement(c)) {
      // @ts-ignore
      return React.cloneElement(c, { data });
    }
    return React.cloneElement(c as React.ReactElement);
  });
};

export default ReadData;
