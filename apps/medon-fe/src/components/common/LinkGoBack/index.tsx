import React from 'react';
import LeftArrow from 'assets/svgs/arrow/left-arrow.svg';
import { Wrapper, StyledSpan, StyledLink, StyledImg } from './styles';

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
