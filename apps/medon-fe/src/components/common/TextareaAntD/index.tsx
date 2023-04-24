import { Input } from 'antd';
import {
  useController,
  FieldValues,
  FieldPath,
  UseControllerProps,
} from 'react-hook-form';

import { Container, ErrorMsg } from './styles';

interface ITextAreaAntDProps {
  placeholder?: string;
  disabled?: boolean;
  size?: 'small' | 'middle' | 'large';
  minRows?: number;
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
}: UseControllerProps<TFieldValues, TName> & ITextAreaAntDProps) {
  const { field, fieldState } = useController({
    name,
    control,
  });

  return (
    <Container>
      <Input.TextArea
        id={name}
        size={size}
        disabled={disabled}
        autoSize={{ minRows }}
        placeholder={placeholder}
        status={fieldState.error ? 'error' : undefined}
        {...field}
      />
      {fieldState.error?.message && (
        <ErrorMsg role="alert">{fieldState.error?.message}</ErrorMsg>
      )}
    </Container>
  );
}
