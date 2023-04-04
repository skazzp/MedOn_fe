import { AnchorHTMLAttributes } from 'react';

export interface LinkHomeProps extends LinkHomeStyledProps {
  children: React.ReactNode;
}

export interface LinkHomeStyledProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  bgColor?: string;
  textColor?: string;
  isFullWidth?: boolean;
}
