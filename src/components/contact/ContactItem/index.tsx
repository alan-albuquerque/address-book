import { concatNotEmpty } from '@src/utils/array';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes, memo } from 'react';
import { FaUser } from 'react-icons/fa';
import LazyLoad from 'react-lazyload';

export interface ContactItemProps extends HTMLAttributes<HTMLDivElement> {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  pictureUrl?: string;
  pictureLazyLoad?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

const ContactItem: FunctionComponent<ContactItemProps> = memo(
  ({
    firstName,
    lastName,
    username,
    email,
    pictureUrl,
    pictureLazyLoad,
    clickable = false,
    className,
    onClick,
    ...rest
  }) => {
    const fullName = concatNotEmpty([firstName, lastName]);
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

    function renderPicturePlaceHolder(testId: string) {
      return (
        <div className="text-4xl text-gray-400" data-testid={testId}>
          <FaUser />
        </div>
      );
    }

    function renderContactPictureImg() {
      return (
        <img
          src={pictureUrl}
          alt={fullName}
          className="contact-picture rounded-full h-14 w-14"
          data-testid="userPicture"
        />
      );
    }

    function renderContactPicture() {
      return pictureLazyLoad ? (
        <LazyLoad
          once
          offset={200}
          placeholder={renderPicturePlaceHolder('pictureLoadingPlaceholder')}
        >
          {renderContactPictureImg()}
        </LazyLoad>
      ) : (
        renderContactPictureImg()
      );
    }

    return (
      <div
        className={classNameList}
        aria-label={contactBoxLabel}
        {...rest}
        onClick={onClick}
        onKeyDown={onClick}
        role="button"
        tabIndex={0}
      >
        <div className="flex flex-row">
          <div>
            <div
              className="
            flex justify-center items-center p-0.5 rounded-full
            overflow-hidden border w-16 h-16
            "
            >
              {pictureUrl
                ? renderContactPicture()
                : renderPicturePlaceHolder('userPicturePlaceholder')}
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
  },
);

export default ContactItem;
