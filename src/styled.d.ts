import "styled-component";

declare module "styled-component" {
  export interface DefaultTheme {
    textColor: string;
    boardColor: string;
    cardColor: string;
  }
}
