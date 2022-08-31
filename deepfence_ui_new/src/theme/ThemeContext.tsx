import { createContext, FC, ReactNode, useContext } from 'react';

import defaultTheme from './default';
import { Theme } from './Theme';
export type Mode = string | undefined | 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  mode?: Mode;
  toggleMode?: () => void | null;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: defaultTheme,
});

interface ThemeProviderProps {
  children: ReactNode;
  value: ThemeContextProps;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, value }) => {
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useTheme(): ThemeContextProps {
  return useContext(ThemeContext);
}
