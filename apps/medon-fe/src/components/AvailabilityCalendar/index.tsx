import { momentLocalizer, Views } from 'react-big-calendar';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { SelectAntD } from 'components/common';
import { endHours, startHours } from 'utils/constants/options/hourOptions';
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
import { useCalendar } from './useCalendar';

export default function AvailabilityCalendar() {
  const localizer = momentLocalizer(moment);
  const { t } = useTranslation();
  const {
    handleSelectDay,
    handleSelectEvent,
    submitEvent,
    handleRemove,
    handleCancel,
    control,
    handleSubmit,
    editIndex,
    selectedDay,
    myEvents,
    dateInText,
  } = useCalendar();

  return (
    <Container onClick={(e) => console.log(e.target, e.currentTarget)}>
      <Title>{t('availability.title')}</Title>
      <StyledCalendar
        defaultView={Views.MONTH}
        events={myEvents}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
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
          <Form onSubmit={handleSubmit(submitEvent)}>
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
