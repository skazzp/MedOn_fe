import { forwardRef } from 'react';
import { StyledInput } from './styles';
import { InputProps } from './InputTypes';

function Input(props: InputProps, ref: React.Ref<HTMLInputElement>) {
  return <StyledInput ref={ref} {...props} />;
}

export default forwardRef(Input);
