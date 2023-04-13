export interface ButtonProps extends ButtonStyleProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

export interface ButtonStyleProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  bgcolor?: string;
  textcolor?: string;
  isfullwidth?: string;
}
