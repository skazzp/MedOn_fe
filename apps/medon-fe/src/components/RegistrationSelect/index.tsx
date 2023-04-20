import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { ErrorMsg, LabelText, StyledSelect } from './styles';
import { IProps } from './types';

export default function RegistrationSelect({
  control,
  name,
  options,
  error,
}: IProps) {
  const { t } = useTranslation();

  return (
    <>
      <LabelText>{t(`regForm.${name}.label`)}</LabelText>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <StyledSelect
            showSearch
            id={name}
            placeholder={`${t(`regForm.${name}.placeholder`)}`}
            status={error ? 'error' : undefined}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            {...field}
            options={options}
          />
        )}
      />
      {error && <ErrorMsg role="alert">{t(`${error}`)}</ErrorMsg>}
    </>
  );
}
