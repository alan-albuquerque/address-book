import { render } from '@testing-library/react';
import React from 'react';
import ContactDetail, {
  ContactDetailProps,
} from '@src/components/contact/ContactDetail';

const renderContactDetail = (props: ContactDetailProps = { contact: {} }) => {
  return render(<ContactDetail {...props} />);
};

const defaultProps: () => ContactDetailProps = () => ({
  clickable: true,
  contact: {
    id: 'user-id',
    firstName: 'first name',
    lastName: 'last name',
    pictureUrl: 'http://addressbooktest.com/image.jpg',
    pictureMediumUrl: 'http://addressbooktest.com/image-medium.jpg',
    username: '@username',
    email: 'email@test.com',
    streetName: 'Street Name',
    streetNumber: 102,
    city: 'My City',
    state: 'My State',
    postcode: '1254896',
    phone: '011-962-7516',
    cell: '081-454-0666',
  },
  onClick: jest.fn(),
});

describe('<ContactDetail />', () => {
  test('should proper render the general information', async () => {
    const props = defaultProps();
    const { contact } = props;
    const { getByTestId, queryByTestId } = renderContactDetail(props);
    const firstName = await getByTestId('firstName');
    const lastName = await getByTestId('lastName');
    const street = await getByTestId('street');
    const city = await getByTestId('city');
    const state = await getByTestId('state');
    const postcode = await getByTestId('postcode');
    const userPicture = await getByTestId('userPicture');
    const userPicturePlaceholder = await queryByTestId(
      'userPicturePlaceholder',
    );
    expect(userPicture.getAttribute('src')).toEqual(contact?.pictureMediumUrl);
    expect(firstName).toHaveTextContent(contact?.firstName as string);
    expect(lastName).toHaveTextContent(contact?.lastName as string);
    expect(street).toHaveTextContent('102, Street Name');
    expect(city).toHaveTextContent(contact?.city as string);
    expect(state).toHaveTextContent(contact?.state as string);
    expect(postcode).toHaveTextContent(contact?.postcode as string);
    expect(userPicturePlaceholder).toBeNull();
  });

  test('should proper render the email link', async () => {
    const props = defaultProps();
    const { contact } = props;
    const { getByTestId } = renderContactDetail(props);
    const email = await getByTestId('email');

    expect(email).toHaveTextContent(contact?.email as string);
    expect(email).toHaveAttribute('href', `mailto:${contact?.email}`);
    expect(email).toHaveAttribute(
      'title',
      `Write an email to ${contact?.firstName} ${contact?.lastName}`,
    );
    expect(email).toHaveAttribute(
      'aria-label',
      `Write an email to ${contact?.firstName} ${contact?.lastName}`,
    );
  });

  test('should proper render the cell phone link', async () => {
    const props = defaultProps();
    const { contact } = props;
    const { getByTestId } = renderContactDetail(props);
    const cell = await getByTestId('cell');

    expect(cell).toHaveTextContent(contact?.cell as string);
    expect(cell).toHaveAttribute('href', `tel:${contact?.cell}`);
    expect(cell).toHaveAttribute(
      'title',
      `Call ${contact?.firstName} ${contact?.lastName}'s cell phone`,
    );
    expect(cell).toHaveAttribute(
      'aria-label',
      `Call ${contact?.firstName} ${contact?.lastName}'s cell phone`,
    );
  });

  test('should proper render the phone link', async () => {
    const props = defaultProps();
    const { contact } = props;
    const { getByTestId } = renderContactDetail(props);
    const phone = await getByTestId('phone');

    expect(phone).toHaveTextContent(contact?.phone as string);
    expect(phone).toHaveAttribute('href', `tel:${contact?.phone}`);
    expect(phone).toHaveAttribute(
      'title',
      `Call ${contact?.firstName} ${contact?.lastName}'s phone`,
    );
    expect(phone).toHaveAttribute(
      'aria-label',
      `Call ${contact?.firstName} ${contact?.lastName}'s phone`,
    );
  });
});
