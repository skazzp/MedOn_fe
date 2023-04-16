import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { ErrorMsg, LabelText, StyledSelect } from './styles';
import { IProps } from './types';

export default function ProfileSelect({ control, name, options, error, userData }: IProps) {
  const { t } = useTranslation();

  return (
    <>
      <LabelText>{t(`profileForm.${name}.label`)}</LabelText>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => {
          let selectedValue;
          switch (name) {
            case 'country':
              selectedValue = userData?.country;
              break;
            case 'timezone':
              selectedValue = userData?.timeZone;
              break;
            case 'role':
              selectedValue = userData?.role;
              break;
            default:
              selectedValue = field.value;
          }

          return (
            <StyledSelect
              showSearch
              id={name}
              size="large"
              placeholder={`${t(`profileForm.${name}.placeholder`)}`}
              status={error ? 'error' : undefined}
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              {...field}
              options={options}
              value={selectedValue}
            />
          );
        }}
      />
      {error && <ErrorMsg role="alert">{t(`${error}`)}</ErrorMsg>}
    </>
  );
}