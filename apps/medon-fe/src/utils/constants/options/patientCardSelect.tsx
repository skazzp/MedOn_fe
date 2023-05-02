import i18n from 'i18next';
import { Prefix } from './stylesPatientCard';

export const options = [
  {
    value: 'ASC',
    label: (
      <>
        <Prefix>{i18n.t('select-options.sortBy')}: </Prefix>
        <span>{i18n.t('select-options.dateOldest')}</span>
      </>
    ),
  },
  {
    value: 'DESC',
    label: (
      <>
        <Prefix>{i18n.t('select-options.sortBy')}: </Prefix>
        <span>{i18n.t('select-options.dateLatest')}</span>
      </>
    ),
  },
];
