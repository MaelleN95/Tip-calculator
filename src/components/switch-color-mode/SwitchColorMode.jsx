import { useState, useEffect } from 'react';

function SwitchColorMode() {
  // Check if the user prefers dark mode by default
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // Toggle the color mode
  const toggleColorMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Set the color theme attribute on the html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('color-theme', 'dark');
    } else {
      document.documentElement.setAttribute('color-theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className="switch-color-mode">
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={toggleColorMode}
        // Allow the user to toggle the color mode by pressing the Enter key
        onKeyDown={(e) => {
          if (e.key === 'Enter') toggleColorMode();
        }}
        id="switch-color-mode-checkbox"
        tabIndex={0}
      />
      <label htmlFor="switch-color-mode-checkbox">Switch color theme</label>
    </div>
  );
}

export default SwitchColorMode;
