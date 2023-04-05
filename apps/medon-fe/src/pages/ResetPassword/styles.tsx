import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100vh;

  font-family: ${({ theme }) => theme.fontFamily.roboto};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
  margin-bottom: 2rem;
  > h1,
  h3 {
    color: ${({ theme }) => theme.colors.BLACK_87};
  }

  > h1 {
    font-size: 1.25rem;
    font-weight: 500;
  }

  > h3 {
    font-weight: 400;
    font-size: 0.875rem;
  }
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  font-size: 0.75rem;
  justify-content: center;
  width: 100%;
  height: 3.125rem;
  > a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.BLACK_87};
  }
`;

export const ErrorNotification = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.colors.RED_500};
  font-size: 0.8rem;
`;
