import { IContact } from '@src/domain/Contact';
import { concatNotEmpty } from '@src/utils/array';
import React, { FunctionComponent, memo } from 'react';
import { FaUser } from 'react-icons/fa';

export interface ContactDetailProps {
  contact?: Partial<IContact>;
  clickable?: boolean;
  onClick?: () => void;
}

const ContactDetail: FunctionComponent<ContactDetailProps> = memo(
  ({ contact }) => {
    if (!contact) return null;

    const {
      firstName,
      lastName,
      pictureMediumUrl,
      username,
      cell,
      city,
      phone,
      postcode,
      state,
      streetName,
      streetNumber,
      email,
    } = contact;

    const fullName = concatNotEmpty([firstName, lastName]);
    const street = concatNotEmpty([streetNumber, streetName], ', ');

    return (
      <div className="flex flex-col justify-center items-center p-6">
        <div
          className="
            flex justify-center items-center p-0.5 rounded-full
            overflow-hidden border w-24 h-24 mb-3
            "
        >
          {pictureMediumUrl ? (
            <img
              src={pictureMediumUrl}
              alt={fullName}
              className="rounded-full h-full w-full"
              data-testid="userPicture"
            />
          ) : (
            <div
              className="text-6xl text-gray-400"
              data-testid="userPicturePlaceholder"
            >
              <FaUser />
            </div>
          )}
        </div>
        <div className="long-text-break">
          <div className="text-xl px-2 pb-3 border-b mb-3 text-center">
            {firstName && (
              <span className="text-purple-800" data-testid="firstName">
                {firstName}
              </span>
            )}
            {lastName && (
              <span
                className="text-purple-800 font-semibold ml-1"
                data-testid="lastName"
              >
                {lastName}
              </span>
            )}
            {username && (
              <span className="text-gray-500 text-base block">{username}</span>
            )}
          </div>
          <div className="px-2 grid grid-cols-1 sm:grid-cols-2 gap-x-10">
            <div className="my-2">
              <div className="text-xs font-semibold uppercase">email</div>

              <span className="text-gray-700">
                {email ? (
                  <a
                    href={`mailto:${email}`}
                    title={`Write an email to ${fullName}`}
                    aria-label={`Write an email to ${fullName}`}
                    className="text-purple-800 hover:underline"
                    data-testid="email"
                  >
                    {email}
                  </a>
                ) : (
                  '-'
                )}
              </span>
            </div>
            <div className="my-2">
              <div className="text-xs font-semibold uppercase">cell</div>
              <span className="text-gray-700">
                {cell ? (
                  <a
                    href={`tel:${cell}`}
                    title={`Call ${fullName}'s cell phone`}
                    aria-label={`Call ${fullName}'s cell phone`}
                    className="text-purple-800 hover:underline"
                    data-testid="cell"
                  >
                    {cell}
                  </a>
                ) : (
                  '-'
                )}
              </span>
            </div>
            <div className="my-2">
              <div className="text-xs font-semibold uppercase">phone</div>
              <span className="text-gray-700">
                {phone ? (
                  <a
                    href={`tel:${phone}`}
                    title={`Call ${fullName}'s phone`}
                    aria-label={`Call ${fullName}'s phone`}
                    className="text-purple-800 hover:underline"
                    data-testid="phone"
                  >
                    {phone}
                  </a>
                ) : (
                  '-'
                )}
              </span>
            </div>
          </div>
          <h2 className="font-semibold border-b my-3">Address</h2>
          <div className="px-2 grid grid-cols-1 sm:grid-cols-2 gap-x-10">
            <div className="my-2">
              <div className="text-xs font-semibold uppercase">street</div>
              <span className="text-gray-700" data-testid="street">
                {street || '-'}
              </span>
            </div>
            <div className="my-2">
              <div className="text-xs font-semibold uppercase">city</div>
              <span className="text-gray-700" data-testid="city">
                {city || '-'}
              </span>
            </div>
            <div className="my-2">
              <div className="text-xs font-semibold uppercase">state</div>
              <span className="text-gray-700" data-testid="state">
                {state || '-'}
              </span>
            </div>
            <div className="my-2">
              <div className="text-xs font-semibold uppercase">postcode</div>
              <span className="text-gray-700" data-testid="postcode">
                {postcode || '-'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default ContactDetail;
