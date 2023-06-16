import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const DarkModeContext = createContext();

export const useDarkModeContext = () => {
  return useContext(DarkModeContext);
};

export const DarkModeProvider = ({ children }) => {
  const [enabled, setEnabled] = useState(false);

  return (
    <DarkModeContext.Provider value={{ enabled, setEnabled }}>
      {children}
    </DarkModeContext.Provider>
  );
};

DarkModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};