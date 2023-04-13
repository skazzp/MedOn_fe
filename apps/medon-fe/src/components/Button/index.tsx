import { ButtonProps } from 'components/Button/types';
import { StyledButton } from 'components/Button/styles';
import Spinner from 'components/Spinner';

export default function Button({ children, isLoading, ...rest }: ButtonProps) {
  return (
    <StyledButton disabled={isLoading} type="submit" {...rest}>
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
