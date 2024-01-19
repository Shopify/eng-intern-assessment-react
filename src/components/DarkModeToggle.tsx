import React from 'react';
import '../styles/DarkModeToggle.css';

// Props definition for the DarkModeToggle component
interface DarkModeToggleProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// The DarkModeToggle component is a button that allows users to toggle between light and dark mode
const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    // Button that triggers the dark mode state change
    <button onClick={toggleDarkMode} className="theme-toggle">
      {/* Icon changes based on the darkMode state. Sun for light mode, moon for dark mode. */}
      {darkMode ? '🌞' : '🌜'}
    </button>
  );
};

export default DarkModeToggle;
