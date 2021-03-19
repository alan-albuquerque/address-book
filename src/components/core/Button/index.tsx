import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactElement;
  className?: string;
}

const Button: FunctionComponent<ButtonProps> = props => {
  const { type, icon, children, className, role, ...rest } = props;

  const buttonClassNames = classNames(
    'flex',
    'justify-center',
    'items-center',
    'align-center',
    'text-gray-500',
    'hover:text-purple-800',
    'p-1.5',
    'rounded-3xl',
    'hover:bg-gray-200',
    'active:bg-gray-300',
    'focus:outline-none',
    className,
  );

  /* eslint-disable react/button-has-type */
  // 'react/button-has-type' rule requires the 'type' property to be a static string,
  // but this does not work if we are creating an abstract button component
  return (
    <button
      type={type || 'button'}
      className={buttonClassNames}
      role={role || 'button'}
      {...rest}
    >
      {icon}
      {children && (
        <div className="ml-2" data-testid="buttonLabel">
          {children}
        </div>
      )}
    </button>
  );
  /* eslint-enable react/button-has-type */
};

export default Button;
