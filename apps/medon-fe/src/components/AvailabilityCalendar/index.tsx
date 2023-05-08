import { dayjsLocalizer, Views } from 'react-big-calendar';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { SelectAntD } from 'components/common';
import { endHours, startHours } from 'utils/constants/options/hourOptions';
import { useCalendar } from './hooks';
import {
  AddTimeBox,
  BtnContainer,
  Container,
  DateText,
  Form,
  InputContainer,
  StyledButton,
  StyledCalendar,
  Text,
  Title,
} from './style';


export default function AvailabilityCalendar() {
  const localizer = dayjsLocalizer(dayjs);
  const { t } = useTranslation();
  const {
    handleSelectDay,
    handleSelectEvent,
    handleSubmitEvent,
    handleRemove,
    handleCancel,
    control,
    handleSubmit,
    editIndex,
    selectedDay,
    timeSlots,
    dateInText,
    dayPropGetter,
  } = useCalendar();

  return (
    <Container>
      <Title>{t('availability.title')}</Title>
      <StyledCalendar
        defaultView={Views.MONTH}
        events={timeSlots}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        dayPropGetter={dayPropGetter}
        onSelectSlot={handleSelectDay}
        views={[Views.MONTH, Views.AGENDA]}
        selectable
        popup
        step={60}
        timeslots={1}
      />
      <AddTimeBox>
        {!selectedDay ? (
          <DateText>{t('availability.message')}</DateText>
        ) : (
          <Form onSubmit={handleSubmit(handleSubmitEvent)}>
            <DateText>{dateInText}</DateText>
            <InputContainer>
              <SelectAntD
                name="start"
                control={control}
                size="large"
                options={startHours}
              />
              <Text>-</Text>
              <SelectAntD
                name="end"
                control={control}
                size="large"
                options={endHours}
              />
            </InputContainer>
            <BtnContainer>
              <StyledButton type="primary" htmlType="submit" size="large">
                {editIndex === null ? (
                  <>
                    <CheckOutlined />
                    &nbsp;{t('save')}
                  </>
                ) : (
                  <>
                    <EditOutlined />
                    &nbsp;{t('edit')}
                  </>
                )}
              </StyledButton>
              {editIndex !== null && (
                <StyledButton
                  type="default"
                  htmlType="button"
                  size="large"
                  danger
                  onClick={handleRemove}
                >
                  <DeleteOutlined />
                </StyledButton>
              )}
              <StyledButton
                type="default"
                htmlType="button"
                size="large"
                onClick={handleCancel}
              >
                <CloseOutlined />
              </StyledButton>
            </BtnContainer>
          </Form>
        )}
      </AddTimeBox>
    </Container>
  );
}
