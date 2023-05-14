import { LinkHomeProps } from 'components/Link/types';
import { StyledLink } from 'components/Link/styles';

export default function LinkHome({ children, ...rest }: LinkHomeProps) {
  return <StyledLink {...rest}>{children}</StyledLink>;
}
