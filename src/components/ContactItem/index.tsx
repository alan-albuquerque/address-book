import React, { FunctionComponent, HTMLAttributes } from 'react';
import { FaUser } from 'react-icons/fa';
import classNames from 'classnames';

export interface ContactItemProps extends HTMLAttributes<HTMLDivElement> {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  pictureUrl?: string;
  clickable?: boolean;
}

const ContactItem: FunctionComponent<ContactItemProps> = ({
  firstName,
  lastName,
  username,
  email,
  pictureUrl,
  clickable = false,
  className,
  ...rest
}) => {
  const fullName = [firstName, lastName].filter(Boolean).join(' ');
  const contactBoxLabel = `${fullName}'s contact card`;

  const classNameList = classNames(
    'flex',
    'p-0.5',
    'sm:p-1.5',
    'rounded-2xl',
    'border',
    { 'hover:bg-purple-100  active:bg-purple-300 cursor-pointer': clickable },
    className,
  );

  return (
    <div className={classNameList} aria-label={contactBoxLabel} {...rest}>
      <div className="flex flex-row">
        <div>
          <div className="flex justify-center items-center p-0.5 rounded-full overflow-hidden border hover:bg-purple-800 w-16 h-16">
            {pictureUrl ? (
              <img
                src={pictureUrl}
                alt={fullName}
                className="contact-picture rounded-full"
                data-testid="userPicture"
              />
            ) : (
              <div
                className="text-4xl text-gray-400"
                data-testid="userPicturePlaceholder"
              >
                <FaUser />
              </div>
            )}
          </div>
        </div>
        <div className="px-2">
          <div>
            <span className="text-purple-800" data-testid="firstName">
              {firstName}
            </span>
            <span
              className="text-purple-800 font-semibold ml-1"
              data-testid="lastName"
            >
              {lastName}
            </span>
          </div>
          <div className="leading-3">
            <span className="text-sm text-gray-700" data-testid="username">
              {username}
            </span>
          </div>
          <div className="leading-3">
            <span className="text-sm text-gray-700" data-testid="email">
              {email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
