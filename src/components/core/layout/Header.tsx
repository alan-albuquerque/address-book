import React, { FunctionComponent } from 'react';

const Header: FunctionComponent = ({ children }) => {
  return <div className="flex-1 h-14">{children}</div>;
};

export default Header;
