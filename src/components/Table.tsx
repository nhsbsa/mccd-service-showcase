import React, { ReactNode } from 'react';
import { DataType } from '@/lib/types';

interface TableHeaderProps {
    children: ReactNode;
}

interface TableRowProps {
    isHeader?: boolean;
    children: ReactNode;
}

interface TableCellProps {
    isHeader?: boolean
    children: ReactNode
}

interface TableProps {
    caption: string
    data: DataType
  // eslint-disable-next-line no-unused-vars
    transform: { [key: string]: (value: any, row: any) => ReactNode }
    children: ReactNode
}

export const TableRow: React.FC<TableRowProps> = ({ isHeader = false, children }) => (isHeader ? (
  <tr role="row">{children}</tr>
) : (
  <tr role="row" className="govuk-table__row">
    {children}
  </tr>
));
export const TableHeader: React.FC<TableHeaderProps> = ({ children }) => (
  <TableRow isHeader>
    {React.Children.map<ReactNode, ReactNode>(children, (c) => {
      if (React.isValidElement(c)) {
        return React.cloneElement(c, { isHeader: true } as TableCellProps) as React.ReactNode;
      }
      return null;
    })}
  </TableRow>
);

export const TableCell: React.FC<TableCellProps> = ({ isHeader = false, children }) => (isHeader ? (
  <th role="columnheader" className="govuk-table__header" scope="col">
    {children}
  </th>
) : (
  <td className="govuk-table__cell">{children}</td>
));

const Table: React.FC<TableProps> = ({
  caption = '', data, transform, children,
}) => {
  const arrayToTable = (v: object[]) => {
    if (v && v.length > 0) {
      const header = (
        <TableHeader>
          {Object.keys(v[0]).map((h) => <TableCell key={h}>{h}</TableCell>)}
        </TableHeader>
      );

      const rows = v.map((row, i) => (
        <TableRow key={`row_${i + 1}`}>
          {Object.entries(row).map(([k, r], index) => {
            let t = r;
            if (transform && transform[k]) {
              t = transform[k](r, row);
            }
            if (typeof r === 'object' && r !== null) {
              if (Array.isArray(r)) {
                t = r.map((item) => item).toString();
              } else {
                t = Object.entries(r as object)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(', ');
              }
            }
            return <TableCell key={`cell_${index + 1}`}>{t as string}</TableCell>;
          })}
        </TableRow>
      ));

      return [header, rows];
    }
    return [[], []];
  };

  const valueToTable = (v: object | []) => (Array.isArray(v) ? arrayToTable(v) : arrayToTable([v]));

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

  const [headers, rows] = data ? valueToTable(data)
    : partitionChildren(
      React.Children.toArray(children),
      (e) => React.isValidElement(e) && e.type === TableHeader,
    ) || [[], []];

  return (
    <div style={{ overflowX: 'scroll' }} className="govuk-table--container">
      <table className="govuk-table">
        <caption className="govuk-table__caption">{caption}</caption>
        <thead className="govuk-table__head">{headers}</thead>
        <tbody className="govuk-table__body">{rows}</tbody>
      </table>
    </div>
  );
};

export default Table;
