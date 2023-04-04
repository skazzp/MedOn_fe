import { LinkHomeProps } from './LinkHomeTypes';
import { StyledLinkHome } from './styles';

export default function LinkHome({ children, ...rest }: LinkHomeProps) {
  return <StyledLinkHome {...rest}>{children}</StyledLinkHome>;
}
