import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

export type Theme = {
  darkMode: boolean;
};

export interface ThemeContextInterface {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

const defaultThemeState = {
  theme: {
    darkMode: true,
  },
  setTheme: (theme: Theme) => {},
} as ThemeContextInterface;

export const ThemeContext = createContext(defaultThemeState);

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>({
    darkMode: true,
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
