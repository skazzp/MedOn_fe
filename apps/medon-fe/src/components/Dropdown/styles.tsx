import { ReactComponent as ThreeDots } from 'assets/svgs/three_dots.svg';
import styled from 'styled-components';

export const StyledThreeDots = styled(ThreeDots)`
  margin: 0 1rem;
  width: 1rem;
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: scale(0.9);
  }
`;
