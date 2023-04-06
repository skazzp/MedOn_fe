import { forwardRef } from 'react';

import {
  ErrorNotification,
  StyledInput,
  Wrapper,
} from 'components/Input/styles';
import { InputProps } from 'components/Input/types';

function Input(
  { errorMessage, ...rest }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <Wrapper>
      <StyledInput ref={ref} {...rest} errorBorder={Boolean(errorMessage)} />
      <ErrorNotification>{errorMessage}</ErrorNotification>
    </Wrapper>
  );
}

export default forwardRef(Input);
