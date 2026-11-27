import React from "react";
import "./styles/theme-selector.css";

interface ThemeSelectorProps {
  themeSelect: (accentColor: string) => void;
  theme: string;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ theme, themeSelect }) => {
  const themes = [
    '#FF5E5E',
    '#A388EE',
    '#88cf97',
  ];

  return (
    <div className="theme-selector">
      <span className="theme-selector__heading">Select theme</span>
      {themes.map((color: string) => (
        <button
          key={color}
          className={`theme-selector__button ${theme === color ? "theme-selector__button--active" : ""}`}
          onClick={() => themeSelect(color)}
          style={{ '--theme-color': color } as React.CSSProperties}
        ></button>
      ))}
    </div>
  );
}

export default ThemeSelector;