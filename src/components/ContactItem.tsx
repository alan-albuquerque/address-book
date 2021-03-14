import React, { FunctionComponent } from 'react';
import { FaUser } from 'react-icons/fa';

export interface ContactItemProps {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  pictureUrl?: string;
}

const ContactItem: FunctionComponent<ContactItemProps> = ({
  firstName,
  lastName,
  username,
  email,
  pictureUrl,
}) => {
  const fullName = [firstName, lastName].filter(Boolean).join(' ');
  return (
    <div className="flex p-0.5 sm:p-1.5 rounded-2xl border max-w-2xl">
      <div className="flex flex-row">
        <div>
          <div className="flex justify-center items-center p-0.5 rounded-full overflow-hidden border hover:bg-purple-800 w-16 h-16">
            {pictureUrl ? (
              <img src={pictureUrl} alt={fullName} className="rounded-full" />
            ) : (
              <div className="text-4xl text-gray-400">
                <FaUser />
              </div>
            )}
          </div>
        </div>
        <div className="px-2">
          <div>
            <span className="text-purple-800">{firstName}</span>
            <span className="text-purple-800 font-semibold ml-1">
              {lastName}
            </span>
          </div>
          <div className="leading-3">
            <span className="text-sm text-gray-700">{username}</span>
          </div>
          <div className="leading-3">
            <span className="text-sm text-gray-700">{email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
