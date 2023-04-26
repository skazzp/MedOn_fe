import { ButtonProps } from 'components/Button/types';
import { StyledButton } from 'components/Button/styles';
import Spinner from 'components/Spinner';

export default function Button({
  children,
  type = 'submit',
  isLoading,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton type={type} disabled={isLoading} {...rest}>
      {isLoading ? (
        <>
          {children}
          <Spinner />
        </>
      ) : (
        children
      )}
    </StyledButton>
  );
}
