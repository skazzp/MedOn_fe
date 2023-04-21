import { Input } from 'antd';
import {
  useController,
  FieldValues,
  FieldPath,
  UseControllerProps,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AntInputDisabledStyle, AntInputStyle, ErrorMsg } from './styles';

interface IInputAntDProps {
  placeholder?: string;
  disabled?: boolean;
  size?: 'small' | 'middle' | 'large';
}

export function InputAntD<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  placeholder,
  disabled = false,
  size = 'middle',
}: UseControllerProps<TFieldValues, TName> & IInputAntDProps) {
  const { field, fieldState } = useController({
    name,
    control,
  });
  const { t } = useTranslation();

  return (
    <>
      <Input
        id={name}
        size={size}
        style={disabled ? AntInputDisabledStyle : AntInputStyle}
        disabled={disabled}
        status={fieldState.error ? 'error' : undefined}
        placeholder={placeholder}
        {...field}
      />
      {fieldState.error?.message && (
        <ErrorMsg role="alert">{t(`${fieldState.error?.message}`)}</ErrorMsg>
      )}
    </>
  );
}
