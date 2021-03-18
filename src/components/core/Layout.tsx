import React, { FunctionComponent } from 'react';

const Layout: FunctionComponent = ({ children }) => {
  return (
    <div className="container mx-auto flex-auto flex-col min-h-0">
      {children}
    </div>
  );
};

export default Layout;
