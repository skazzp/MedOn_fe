import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-height: 100vh;
  font-family: ${({ theme }) => theme.fontFamily.sf_pro_text};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
  > h1,
  h3 {
    color: ${({ theme }) => theme.colors.black_87};
  }

  > h1 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: 500;
  }

  > h3 {
    font-weight: 400;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 2rem;
  flex: 1;
  width: 22rem;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  width: 100%;
  height: 6.25rem;
  padding: 0 4rem;
  align-items: center;
  > img {
    width: 12rem;
  }
`;

export const Footer = styled.footer`
  display: flex;
  gap: 2rem;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  justify-content: center;
  width: 100%;
  height: 3.125rem;
  > a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.black_87};
  }
`;
