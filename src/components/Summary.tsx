import React from 'react';
import _ from 'lodash';
import { DataType } from '@/lib/types';

type KeyValue = {
  [key:string]: string | any
}
type TSummary = {
    data: DataType
    children: React.ReactNode
}
type TSummaryEntry = {
    name: string
    value: any
    data: KeyValue
    action?: {
        name: string
        link: string
    } | null
}

export function SummaryEntry({
  name, value, data, action = null,
}:TSummaryEntry) {
  return (
    <div className="govuk-summary-list__row">
      <dt className="govuk-summary-list__key">{_.startCase(name)}</dt>
      <dd className="govuk-summary-list__value">{value ?? data[name]}</dd>
      {action ? (
        <dd className="govuk-summary-list__actions">
          <a href={action.link}>{action.name}</a>
        </dd>
      ) : null}
    </div>
  );
}

function Summary({ data, children }:TSummary) {
  return (
    <dl className="govuk-summary-list">
      {data ? Object.entries(data).map(([k, v]) => <SummaryEntry key={`se-${k}`} name={k} value={v} data={data[0]} />) : children}
    </dl>
  );
}

export default Summary;
