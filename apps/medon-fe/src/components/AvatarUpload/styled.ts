import { CameraOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { theme } from 'styles/theme';

export const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
  cursor: pointer;
`;

export const LabelContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  width: 100%;
  bottom: 0px;
`;

export const Label = styled.label`
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: all 0.2s ease-in;

  &:hover {
    color: ${theme.colors.blue_500};
    fill: ${theme.colors.blue_500};
    scale: 1.1;
  }
`;

export const StyledEditIcon = styled(CameraOutlined)`
  fill: ${theme.colors.icon_active};
  color: ${theme.colors.icon_active};

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const LoaderBox = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
