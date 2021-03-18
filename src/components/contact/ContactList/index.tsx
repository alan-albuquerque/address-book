import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

export type ContactListProps = HTMLAttributes<HTMLDivElement>;

const ContactList: FunctionComponent<ContactListProps> = props => {
  const { className, children, ...rest } = props;

  const classNameList = classNames(
    'flex-auto',
    'mx-auto',
    'flex-col',
    'items-center',
    className,
  );
  return (
    <div className={classNameList} {...rest}>
      {children}
    </div>
  );
};

export default ContactList;
