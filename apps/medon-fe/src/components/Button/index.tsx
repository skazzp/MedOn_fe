import { ButtonProps } from 'components/Button/types';
import { StyledButton } from 'components/Button/styles';

export default function Button({ children, ...rest }: ButtonProps) {
  return (
    <StyledButton type="submit" {...rest}>
      {children}
    </StyledButton>
  );
}
