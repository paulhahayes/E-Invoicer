import React from 'react';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import { useDarkModeContext } from '../contexts/DarkModeContext';
import useDarkMode from '../hooks/useDarkMode'


const DarkModeButton = () => {
  const { enabled, setEnabled } = useDarkModeContext();
  const [darkMode, setDarkMode] = useDarkMode();

  const toggleDarkMode = () => {
    setEnabled(!enabled);
    setDarkMode(!darkMode);
  };

  return (
    <div className={enabled ? 'dark' : ''}>
      <button onClick={toggleDarkMode} className="mt-7">
        {enabled ? <RiSunFill className="h-7 w-7" /> : <RiMoonFill className="h-7 w-7" />}
      </button>
    </div>
  );
};

export default DarkModeButton;