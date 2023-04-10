export interface ButtonProps extends ButtonStyleProps {
  children: React.ReactNode;
}

export interface ButtonStyleProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  bgcolor?: string;
  textcolor?: string;
  isfullwidth?: string;
}
