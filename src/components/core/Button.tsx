import classNames from 'classnames';
import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactElement;
  className?: string;
}

const Button: FunctionComponent<ButtonProps> = props => {
  const { icon, children, className, role, ...rest } = props;

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
    className,
  );

  return (
    <button
      type="button"
      className={buttonClassNames}
      role={role || 'button'}
      {...rest}
    >
      {icon}
      {children && (
        <div className={icon && 'ml-2'} data-testid="buttonLabel">
          {children}
        </div>
      )}
    </button>
  );
};

export default Button;
