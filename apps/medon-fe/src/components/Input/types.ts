import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputStyledProps {
  errorMessage: string;
}
export interface InputStyledProps
  extends InputHTMLAttributes<HTMLInputElement> {
  errorBorder?: boolean;
}
