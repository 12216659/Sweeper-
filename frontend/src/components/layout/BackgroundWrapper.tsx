import React from 'react';
import { useLocation } from 'react-router-dom';
import { GlobalBackground } from '../animations/GlobalBackground';

export const BackgroundWrapper = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  if (isHome) return null;
  
  return <GlobalBackground />;
};
