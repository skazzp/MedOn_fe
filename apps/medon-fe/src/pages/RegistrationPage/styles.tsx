import styled from 'styled-components';

export const FormContainer = styled.div`
  padding: 25px 30px;
  min-width: 700px;
  width: 50%;
  height: 100%;
  background-color: ${(p) => p.theme.colors.white};
`;

export const Title = styled.h1`
  font-family: ${(p) => p.theme.typography.fontFamily.sf_pro_text};
  font-size: 23px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0px;
`;
