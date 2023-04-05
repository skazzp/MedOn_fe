import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const RegContainer = styled.div`
  padding: 1.6rem 2rem;
`;

export const FormContainer = styled.div`
  margin-top: 2rem;
  min-width: 27rem;
  width: 50vw;
  background-color: ${(p) => p.theme.colors.white};
`;

export const Title = styled.h1`
  margin-left: 1.5rem;
  font-family: ${(p) => p.theme.typography.fontFamily.sf_pro_text};
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0em;
`;

export const Text = styled.p`
  margin-left: 2rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-family: ${(p) => p.theme.typography.fontFamily.sf_pro_text};
  font-size: 1rem;
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
  background-image: url('assets/images/sidebar.jpg');
`;
