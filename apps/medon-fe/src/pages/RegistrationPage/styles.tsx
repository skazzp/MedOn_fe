import styled from 'styled-components';
import { authPicture } from 'utils/constants/urls';

export const Container = styled.div`
  display: flex;
`;

export const RegContainer = styled.div`
  padding: 1.6rem 2rem;
  min-width: 50vw;
  width: 50%;
`;

export const FormContainer = styled.div`
  margin-top: 1rem;
  min-width: 27rem;
  width: 100%;
  background-color: ${(p) => p.theme.colors.background_main};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-family: ${(p) => p.theme.fontFamily.sf_pro_text};
  font-size: ${(p) => p.theme.fontSizes.xxxl};
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0em;
  margin-top: 0px;
  margin-bottom: 10px;
`;

export const Text = styled.p`
  margin-left: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-family: ${(p) => p.theme.fontFamily.sf_pro_text};
  font-size: ${(p) => p.theme.fontSizes.md};
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: 0em;
`;

export const Sidebar = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${authPicture});
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;
