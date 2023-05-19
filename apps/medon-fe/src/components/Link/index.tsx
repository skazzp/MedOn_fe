import { LinkProps } from 'components/Link/types';
import { StyledLink } from 'components/Link/styles';

export function Link({ children, ...rest }: LinkProps) {
  return <StyledLink {...rest}>{children}</StyledLink>;
}
