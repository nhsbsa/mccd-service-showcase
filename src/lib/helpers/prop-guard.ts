import { ReactElement } from 'react';

export const hasDataProperty = (obj: ReactElement) => obj && Object.hasOwn(obj.props, 'data');
export default hasDataProperty;
