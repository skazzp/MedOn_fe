export interface ButtonProps extends ButtonStyleProps {
  children: React.ReactNode;
}

export interface ButtonStyleProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  bgColor?: string;
  textColor?: string;
  isFullWidth?: boolean;
}
