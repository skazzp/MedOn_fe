import { LinkHomeProps } from 'components/LinkHome/types';
import { StyledLinkHome } from 'components/LinkHome/styles';

export default function LinkHome({ children, ...rest }: LinkHomeProps) {
  return <StyledLinkHome {...rest}>{children}</StyledLinkHome>;
}
