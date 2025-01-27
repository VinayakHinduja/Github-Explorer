import { createContext, useState, useEffect } from "react";
import { Appearance } from "react-native";

export const ThemeContext = createContext();

const lightTheme = {
  mode: "light",
  backgroundColor: "#fff",
  textColor: "#000",
};

const darkTheme = {
  mode: "dark",
  backgroundColor: "#000",
  textColor: "#fff",
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(darkTheme);

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setTheme(colorScheme === "dark" ? darkTheme : lightTheme);

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === "dark" ? darkTheme : lightTheme);
    });

    return () => subscription.remove();
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
