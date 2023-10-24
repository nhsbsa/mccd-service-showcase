import { DataItem, DataType } from '@/lib/types';

export const filterData = (data: DataType, searchCriteria: string): DataType => {
  if (!searchCriteria) return data;

  const searchKeysValues: Record<string, string[]> = {};

  searchCriteria.toLowerCase().split(',').map((kv: string) => {
    const [key, value] = kv.split(':');
    searchKeysValues[key] = searchKeysValues[key] || [];
    return searchKeysValues[key].push(value.trim().toLowerCase());
  });

  const results: DataType = [];
  const stack: Record<string, any>[] = Array.isArray(data) ? [...data] : [data];

  while (stack.length > 0) {
    const obj = stack.pop();

    if (typeof obj === 'object' && obj !== null) {
      const lcObj: DataItem = {};

      // eslint-disable-next-line no-restricted-syntax
      for (const key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
          if (Array.isArray(obj[key])) {
            lcObj[key.toLowerCase()] = obj[key].map((val: DataItem) => val?.toString().toLowerCase().split(','));
          } else {
            lcObj[key.toLowerCase()] = obj[key]?.toString().toLowerCase();
          }
        }
      }

      let match = true;

      // eslint-disable-next-line no-restricted-syntax
      for (const [searchKey, searchValue] of Object.entries(searchKeysValues)) {
        if (!lcObj[searchKey]) {
          match = false;
          break;
        } else if (!searchValue.some((value) => lcObj[searchKey]?.toString().includes(value))) {
          match = false;
          break;
        }
      }

      if (match) {
        results.push(obj);
      }

      // eslint-disable-next-line no-restricted-syntax
      for (const key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
          stack.push(obj[key]);
        }
      }
    }
  }

  return results;
};

export const filterFields = (d: DataType, fields: string):DataType => {
  if (!fields) return d;
  const inc: string[] = fields.split(':');
  const filteredData: DataItem | DataItem[] = Array.isArray(d)
    ? d.map((item) => inc.reduce((filteredItem, field) => {
      if (item[field] !== undefined) {
        // eslint-disable-next-line no-param-reassign
        filteredItem[field] = item[field];
      }
      return filteredItem;
    }, {} as DataItem))
    : inc.reduce((filteredItem, field) => {
      if (!(d) || d[field] !== undefined) {
        if (d) {
          // eslint-disable-next-line no-param-reassign
          filteredItem[field] = d[field];
        }
      }
      return filteredItem;
    }, {} as DataItem);
  return <DataType>filteredData;
};
