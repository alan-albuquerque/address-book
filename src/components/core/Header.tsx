import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

export interface HeaderProps {
  sticky?: boolean;
}

const Header: FunctionComponent<HeaderProps> = ({ sticky, children }) => {
  const classNameList = classNames('flex-1', { 'sticky top-0': sticky });
  return <header className={classNameList}>{children}</header>;
};

export default Header;
