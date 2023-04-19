import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { DATE_FORMAT_REG } from 'utils/constants/dateFormat';
import dayjs from 'dayjs';
import {
  AntInputDisabledStyle,
  AntInputStyle,
  StyledDatePicker,
} from 'components/ProfileForm/styles';
import { ErrorMsg, LabelText } from './styles';
import { IProps } from './types';

export default function ProfileDatepicker({
  control,
  error,
  disabled,
}: IProps) {
  const { t } = useTranslation();
  return (
    <>
      <LabelText>{t('profileForm.birthday.label')}</LabelText>
      <Controller
        name="birthday"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <StyledDatePicker
            id="birthday"
            placeholder={`${t('profileForm.birthday.placeholder')}`}
            format={DATE_FORMAT_REG}
            allowClear={false}
            size="large"
            style={disabled ? AntInputDisabledStyle : AntInputStyle}
            disabled={disabled}
            status={error ? 'error' : undefined}
            ref={field.ref}
            name={field.name}
            onBlur={field.onBlur}
            value={field.value ? dayjs(field.value) : null}
            onChange={(date) => {
              field.onChange(
                date ? new Date(date.valueOf()).toUTCString() : null
              );
            }}
          />
        )}
      />
      {error && <ErrorMsg role="alert">{t(`${error}`)}</ErrorMsg>}
    </>
  );
}
