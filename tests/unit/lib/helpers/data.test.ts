import { filterData, filterFields } from '@/lib/helpers/data';

describe('filterData function', () => {
  const sampleData = [
    {
      name: 'Jack Jones',
      age: 30,
      address: { city: 'London', country: 'UK' },
    },
    {
      name: 'Delia Smith',
      age: 25,
      address: { city: 'Manchester', country: 'UK' },
    },
  ];

  it('should return the original data if searchCriteria is empty', () => {
    const result = filterData({
      data: sampleData,
      searchCriteria: '',
    });
    expect(result).toEqual(sampleData);
  });

  it('should filter data based on searchCriteria', () => {
    const result = filterData({
      data: sampleData,
      searchCriteria: 'age:25',
    });
    expect(result).toEqual([{ name: 'Delia Smith', age: 25, address: { city: 'Manchester', country: 'UK' } }]);
  });
});

describe('filterFields function', () => {
  const sampleData = [{
    name: 'Jack Jones',
    age: 30,
    address: { city: 'London', country: 'UK' },
  }];

  it('should return the original data if fields is empty', () => {
    const result = filterFields(sampleData, '');
    expect(result).toEqual(sampleData);
  });

  it('should filter fields based on the provided list', () => {
    const result = filterFields(sampleData, 'name:age');
    expect(result).toEqual([{ name: 'Jack Jones', age: 30 }]);
  });
});
