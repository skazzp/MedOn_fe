import { ButtonProps } from './ButtonTypes';
import { StyledButton } from './styles';

export default function Button({ children, ...rest }: ButtonProps) {
  return (
    <StyledButton type="submit" {...rest}>
      {children}
    </StyledButton>
  );
}
