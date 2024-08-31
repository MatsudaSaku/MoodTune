import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export function useTheme() {
    return useContext(ThemeContext);
}
