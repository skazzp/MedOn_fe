import dayjs from 'dayjs';
import {
  useController,
  FieldValues,
  FieldPath,
  UseControllerProps,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { DATE_FORMAT_REG } from 'utils/constants/dateFormat';
import {
  AntInputDisabledStyle,
  AntInputStyle,
  Container,
  ErrorMsg,
  StyledDatePicker,
} from './styles';

interface IDatepickerAntDProps {
  placeholder?: string;
  disabled?: boolean;
  size?: 'small' | 'middle' | 'large';
}

export function DatepickerAntD<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  placeholder,
  disabled = false,
  size = 'middle',
}: UseControllerProps<TFieldValues, TName> & IDatepickerAntDProps) {
  const { field, fieldState } = useController({
    name,
    control,
  });
  const { t } = useTranslation();

  return (
    <Container>
      <StyledDatePicker
        id={name}
        placeholder={placeholder}
        format={DATE_FORMAT_REG}
        allowClear={false}
        size={size}
        style={disabled ? AntInputDisabledStyle : AntInputStyle}
        disabled={disabled}
        status={fieldState.error ? 'error' : undefined}
        ref={field.ref}
        name={field.name}
        onBlur={field.onBlur}
        value={field.value ? dayjs(field.value) : null}
        onChange={(date) => {
          field.onChange(date ? new Date(date.valueOf()).toUTCString() : null);
        }}
      />
      {fieldState.error?.message && (
        <ErrorMsg role="alert">{t(`${fieldState.error?.message}`)}</ErrorMsg>
      )}
    </Container>
  );
}
