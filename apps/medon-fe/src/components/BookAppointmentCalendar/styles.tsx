import { Calendar } from 'react-big-calendar';
import styled from 'styled-components';
import { theme } from 'styles/theme';

export const StyledCalendar = styled(Calendar)`
  width: calc(100% - 50px);
  min-height: 600px;
  height: 65vh;
  font-family: ${theme.fontFamily.sf_pro_text};
  border-top: 1px solid ${theme.colors.gray_400};
  background-color: ${theme.colors.gray_100};
  padding: 5px;
  margin: 0 auto;

  .rbc-header {
    font-size: ${theme.fontSizes.md};
    font-weight: ${theme.fontWeight.medium};
    padding: 5px 10px !important;
  }

  .rbc-month-row {
    padding: 5px;
  }

  .rbc-toolbar {
    flex-direction: row-reverse;
    display: flex;
    justify-content: space-between;
  }

  .rbc-toolbar-label {
    font-size: ${theme.fontSizes.lg};
    font-weight: ${theme.fontWeight.medium};
    display: inherit;
  }

  button {
    font-size: ${theme.fontSizes.md};
    font-family: ${theme.fontFamily.sf_pro_text};
  }

  .rbc-button-link {
    cursor: default;
  }
  .rbc-date-cell {
    padding-left: 5px;
    text-align: left;
  }

  .rbc-btn-group {
    display: flex;
    align-items: center;
    button:first-child {
      border-radius: 4px;
      transition: all 0.7s;
    }
    button:nth-of-type(2) {
      font-size: 0;
      background-image: url(assets/svgs/arrow/circleArrowRight.svg);
      background-repeat: no-repeat;
      border: 0 solid ${theme.colors.white};
      padding: 14px;
      margin-right: 20px;
      margin-left: 30px;
      background-position: center;
      transform: rotate(-180deg);
      transition: all 0.7s;
      :hover {
        background-color: transparent;
        transform: scale(1.2) rotate(-180deg);
      }
      :focus {
        background-color: transparent;
      }
    }

    button:last-child {
      font-size: 0;
      background-image: url(assets/svgs/arrow/circleArrowRight.svg);
      background-repeat: no-repeat;
      border: 0 solid ${theme.colors.white};
      padding: 14px;
      background-position: center;
      transition: all 0.7s;
      :hover {
        background-color: transparent;
        transform: scale(1.2);
      }
      :focus {
        background-color: transparent;
      }
    }
  }
`;
