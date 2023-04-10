import { AnchorHTMLAttributes } from 'react';

export interface LinkHomeProps extends LinkHomeStyledProps {
  children: React.ReactNode;
}

export interface LinkHomeStyledProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  bgcolor?: string;
  textcolor?: string;
  isfullwidth?: string;
  to: string;
}
