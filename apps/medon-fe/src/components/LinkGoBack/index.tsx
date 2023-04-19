import React from 'react';
import {
  Wrapper,
  StyledSpan,
  StyledLink,
  StyledImg,
} from 'components/LinkGoBack/styles';
import LeftArrow from 'assets/svgs/arrow/left-arrow.svg';

export function LinkGoBack({ children }: { children: React.ReactNode }) {
  return (
    <StyledLink to={'..'}>
      <Wrapper>
        <StyledImg src={LeftArrow} alt="" />
        <StyledSpan>{children}</StyledSpan>
      </Wrapper>
    </StyledLink>
  );
}
