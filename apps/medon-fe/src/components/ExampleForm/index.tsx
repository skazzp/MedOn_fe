import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Form } from './styles';

interface FormData {
  firstName: string;
  lastName: string;
}

export default function ExampleForm() {
  const { t } = useTranslation();
  const { register, setValue, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Form onSubmit={onSubmit}>
      <label>{t('form.label1')}</label>
      <input {...register('firstName')} />
      <label>{t('form.label2')}</label>
      <input {...register('lastName')} />
      <button
        type="button"
        onClick={() => {
          setValue('lastName', 'Hello');
        }}
      >
        {t('form.btn-set')}
      </button>
      <button type="submit">{t('form.btn-submit')}</button>
    </Form>
  );
}
