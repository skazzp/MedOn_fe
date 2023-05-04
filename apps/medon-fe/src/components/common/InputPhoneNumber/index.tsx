import React from 'react';
import {
  useController,
  FieldValues,
  FieldPath,
  UseControllerProps,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CountryCode } from 'libphonenumber-js';
import { Container, ErrorMsg, StyledPhoneNumberInput } from './styles';

interface IInputAntDProps {
  defaultCountry: CountryCode;
  placeholder: string;
}

export function InputPhoneNumber<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  defaultCountry,
  placeholder,
}: UseControllerProps<TFieldValues, TName> & IInputAntDProps) {
  const { field, fieldState } = useController({
    name,
    control,
  });
  const { t } = useTranslation();

  return (
    <Container>
      <StyledPhoneNumberInput
        {...field}
        name="phoneNumber"
        placeholder={placeholder}
        defaultCountry={defaultCountry}
        control={control}
      />
      {fieldState.error?.message && (
        <ErrorMsg role="alert">{t(`${fieldState.error?.message}`)}</ErrorMsg>
      )}
    </Container>
  );
}
