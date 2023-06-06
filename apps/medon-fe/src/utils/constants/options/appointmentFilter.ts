import { SelectProps } from 'antd/es/select';
import { ShowAll } from 'interfaces/Filter';

export const options: SelectProps['options'] = [
  { label: 'All', value: ShowAll.true },
  { label: 'Mine', value: ShowAll.false },
];
