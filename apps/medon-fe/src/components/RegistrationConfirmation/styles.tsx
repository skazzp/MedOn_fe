import { Button } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  width: 27rem;
  display: flex;
  flex-direction: column;
  padding-top: 3rem;
`;

export const Title = styled.h1`
  font-family: ${(p) => p.theme.fontFamily.sf_pro_text};
  font-size: ${(p) => p.theme.fontSizes.xxl};
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0em;
`;

export const Text = styled.p`
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-family: ${(p) => p.theme.fontFamily.sf_pro_text};
  font-size: ${(p) => p.theme.fontSizes.md};
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: 0em;
`;

export const Btn = styled(Button)`
  background: ${(p) => p.theme.colors.btnGradient};
  font-family: ${(p) => p.theme.fontFamily.sf_pro_text};
  color: ${(p) => p.theme.colors.white};
  min-width: 10rem;
  width: fit-content;
  margin-bottom: 4rem;
`;

export const BackBtn = styled(Btn)`
  background: ${(p) => p.theme.colors.black};
  width: 100%;
`;
