import React, { ReactNode } from 'react';
import _ from 'lodash';

type KeyValue = {
  [key: string]: string | any;
};

type SummaryEntryProps = {
  name: string;
  value: any;
  data: KeyValue;
  action?: {
    name: string;
    link: string;
  } | null;
};

export const SummaryEntry: React.FC<SummaryEntryProps> = ({
  name, value, data, action = null,
}) => (
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

type SummaryProps = {
  data: KeyValue | null;
  children?: ReactNode;
};

const Summary: React.FC<SummaryProps> = ({ data, children }) => (
  <dl className="govuk-summary-list">
    {data ? Object.entries(data).map(([k, v]) => <SummaryEntry key={`se-${k}`} name={k} value={v} data={data} />) : children || <p className="govuk-body--s">No data available</p> }
  </dl>
);

export default Summary;
