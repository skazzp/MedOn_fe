import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldPath } from 'react-hook-form';
import { FormData } from 'components/RegistrationForm/types';
import { ErrorMsg, LabelText, StyledSelect } from './styles';

interface Option {
  value: string | number;
  label: string;
}

export default function RegistrationSelect({
  control,
  name,
  options,
  error,
}: {
  control: Control<FormData>;
  name: FieldPath<FormData>;
  options: Option[];
  error: string | undefined;
}) {
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
      <ErrorMsg role="alert">{error}</ErrorMsg>
    </>
  );
}
