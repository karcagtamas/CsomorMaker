export interface INavigatorHeader {
  name: string;
  title: string;
  route: string;
  accessLevel: number;
  subHeaders: INavigatorHeader[];
}

export interface Theme {
  clazz: string;
  name: string;
}

export interface RooState {
  isLoggedIn: boolean;
  selectedTheme: Theme;
}
