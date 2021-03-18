import React from 'react';

import { render } from '@testing-library/react';
import ContactItem, { ContactItemProps } from './index';

const renderContactItem = (props: Partial<ContactItemProps> = {}) => {
  return render(<ContactItem {...props} />);
};

const defaultContact: ContactItemProps = {
  username: 'test_username',
  firstName: 'UserFirstName',
  lastName: 'User Last Name',
  email: 'mail@example.com',
  pictureUrl: 'http://img.test/picture.jpg',
};

describe('<ContactItem />', () => {
  test('should display a empty contact, with a picture placeholder by default', async () => {
    const { queryByTestId } = renderContactItem();

    const placeholderPicture = await queryByTestId('userPicturePlaceholder');
    const userPicture = await queryByTestId('userPicture');

    expect(userPicture).toBeNull();
    expect(placeholderPicture).not.toBeNull();
  });

  test('should display a contact, with a profile picture', async () => {
    const { queryByTestId, getByTestId } = renderContactItem(defaultContact);

    const placeholderPicture = await queryByTestId('userPicturePlaceholder');
    const userPicture = await getByTestId('userPicture');
    const firstName = await getByTestId('firstName');
    const lastName = await getByTestId('lastName');
    const username = await getByTestId('username');
    const email = await getByTestId('email');

    expect(placeholderPicture).toBeNull();
    expect(userPicture.getAttribute('src')).toEqual(defaultContact.pictureUrl);
    expect(userPicture.getAttribute('src')).toEqual(defaultContact.pictureUrl);

    expect(firstName).toBeVisible();
    expect(lastName).toBeVisible();
    expect(username).toBeVisible();
    expect(email).toBeVisible();

    expect(firstName.textContent).toEqual(defaultContact.firstName);
    expect(lastName.textContent).toEqual(defaultContact.lastName);
    expect(username.textContent).toEqual(defaultContact.username);
    expect(email.textContent).toEqual(defaultContact.email);
  });
});