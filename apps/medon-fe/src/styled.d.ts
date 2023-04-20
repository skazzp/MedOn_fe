// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      red_300: string;
      red_500: string;
      red_700: string;
      yellow_300: string;
      yellow_500: string;
      yellow_700: string;
      green_300: string;
      green_500: string;
      green_700: string;
      blue_100: string;
      blue_300: string;
      blue_500: string;
      blue_700: string;
      blue_900: string;
      gray_100: string;
      gray_200: string;
      gray_300: string;
      gray_400: string;
      gray_500: string;
      gray_600: string;
      gray_700: string;
      white: string;
      black_87: string;
      black: string;
      title: string;
      btnGradient: string;
    };
    fontFamily: {
      roboto: string;
      sf_pro_text: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
    };
    fontWeight: {
      medium: string;
    };
  }
}
