import { AnchorHTMLAttributes } from 'react';

export interface LinkProps extends LinkStyledProps {
  children: React.ReactNode;
}

export interface LinkStyledProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  bgcolor?: string;
  textcolor?: string;
  isfullwidth?: string;
  to: string;
}
