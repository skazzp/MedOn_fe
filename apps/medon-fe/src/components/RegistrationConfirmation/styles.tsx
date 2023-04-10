import { Button } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  width: 27rem;
  display: flex;
  flex-direction: column;
  padding-top: 3rem;
  /* padding-left: 3rem; */
`;

export const Title = styled.h1`
  /* margin-left: 1.5rem; */
  font-family: ${(p) => p.theme.typography.fontFamily.sf_pro_text};
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0em;
`;

export const Text = styled.p`
  /* margin-left: 1.5rem; */
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-family: ${(p) => p.theme.typography.fontFamily.sf_pro_text};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: 0em;
`;

export const Btn = styled(Button)`
  background: linear-gradient(90deg, #085dd7 -28.15%, #4d93f8 76.48%);
  font-family: ${(p) => p.theme.typography.fontFamily.sf_pro_text};
  color: ${(p) => p.theme.colors.white};
  min-width: 10rem;
  width: fit-content;
`;

export const BackBtn = styled(Btn)`
  background: ${(p) => p.theme.colors.black};
  width: 100%;
  margin-top: 4rem;
`;
