import React, { FunctionComponent } from 'react';

const Layout: FunctionComponent = ({ children }) => {
  return <div className="flex-auto flex-col min-h-0">{children}</div>;
};

export default Layout;
