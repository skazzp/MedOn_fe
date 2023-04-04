// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      RED_300: string;
      RED_500: string;
      RED_700: string;
      YELLOW_300: string;
      YELLOW_500: string;
      YELLOW_700: string;
      GREEN_300: string;
      GREEN_500: string;
      GREEN_700: string;
      BLUE_100: string;
      BLUE_300: string;
      BLUE_500: string;
      BLUE_700: string;
      BLUE_900: string;
      GRAY_100: string;
      GRAY_200: string;
      GRAY_300: string;
      GRAY_400: string;
      GRAY_500: string;
      GRAY_600: string;
      GRAY_700: string;
      WHITE: string;
      BLACK_87: string;
      BLACK: string;
    };
    fontFamily: {
      roboto: string;
      sf_pro_text: string;
    };
  }
}
