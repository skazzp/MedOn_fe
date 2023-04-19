import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { Input } from 'antd';
import {
  AntInputDisabledStyle,
  AntInputStyle,
} from 'components/ProfileForm/styles';
import { ErrorMsg, LabelText } from './styles';
import { IProps } from './types';

export default function ProfileInput({
  control,
  name,
  error,
  disabled,
}: IProps) {
  const { t } = useTranslation();
  return (
    <>
      <LabelText>{t('profileForm.firstName.label')}</LabelText>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            id={name}
            size="large"
            style={disabled ? AntInputDisabledStyle : AntInputStyle}
            disabled={disabled}
            status={error ? 'error' : undefined}
            placeholder={`${t('profileForm.firstName.placeholder')}`}
            {...field}
          />
        )}
      />
      {error && <ErrorMsg role="alert">{t(`${error}`)}</ErrorMsg>}
    </>
  );
}
