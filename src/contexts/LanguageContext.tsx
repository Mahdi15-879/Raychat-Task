import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

export type Language = {
  isFa: boolean;
};

export interface LanguageContextInterface {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
}

const defaultLanguageState = {
  language: {
    isFa: true,
  },
  setLanguage: (language: Language) => {},
} as LanguageContextInterface;

export const LanguageContext = createContext(defaultLanguageState);

type LanguageProviderProps = {
  children: ReactNode;
};

const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>({
    isFa: true,
  });

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
