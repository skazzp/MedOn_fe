import {
  useController,
  FieldValues,
  FieldPath,
  UseControllerProps,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { theme } from 'styles/theme';
import { Container, ErrorMsg, StyledSelect } from './styles';

export interface Option {
  value: string | number;
  label: string;
}

interface ISelectAntDProps {
  placeholder?: string;
  disabled?: boolean;
  size?: 'small' | 'middle' | 'large';
  options: Option[];
}

export function SelectAntD<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  placeholder,
  options,
  disabled = false,
  size = 'middle',
}: UseControllerProps<TFieldValues, TName> & ISelectAntDProps) {
  const { field, fieldState } = useController({
    name,
    control,
  });
  const { t } = useTranslation();

  return (
    <Container>
      <StyledSelect
        showSearch
        id={name}
        size={size}
        style={{
          fontFamily: theme.fontFamily.sf_pro_text,
          fontSize: theme.fontSizes.md,
        }}
        disabled={disabled}
        status={fieldState.error ? 'error' : undefined}
        placeholder={placeholder}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        {...field}
        options={options}
      />
      {fieldState.error?.message && (
        <ErrorMsg role="alert">{t(`${fieldState.error?.message}`)}</ErrorMsg>
      )}
    </Container>
  );
}
