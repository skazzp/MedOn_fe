import { Input } from 'antd';
import {
  useController,
  FieldValues,
  FieldPath,
  UseControllerProps,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Container, ErrorMsg } from './styles';

interface ITextAreaAntDProps {
  placeholder?: string;
  disabled?: boolean;
  size?: 'small' | 'middle' | 'large';
  minRows?: number;
  showCount?: boolean;
  maxLength?: number;
}

export function TextareaAntD<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  placeholder,
  disabled = false,
  size = 'middle',
  minRows = 4,
  ...rest
}: UseControllerProps<TFieldValues, TName> & ITextAreaAntDProps) {
  const { field, fieldState } = useController({
    name,
    control,
  });

  const { t } = useTranslation();

  return (
    <Container>
      <Input.TextArea
        id={name}
        size={size}
        disabled={disabled}
        autoSize={{ minRows }}
        placeholder={placeholder}
        status={fieldState.error ? 'error' : undefined}
        {...rest}
        {...field}
      />
      {fieldState.error?.message && (
        <ErrorMsg role="alert">{t(`${fieldState.error?.message}`)}</ErrorMsg>
      )}
    </Container>
  );
}
