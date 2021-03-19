import { IContact } from '@src/domain/Contact';
import {
  IRandomUser,
  randomUserService,
} from '@src/services/RandomUserService';
import { ContactStore } from '@src/store/ContactStore/index';

jest.mock('@src/services/RandomUserService');
const mockedRandomUserService = randomUserService as jest.Mocked<
  typeof randomUserService
>;

function createContact(props?: Partial<IContact>): IContact {
  return {
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
    ...props,
  };
}

function getRandomUsers(randomUsers: IRandomUser[]) {
  return {
    results: randomUsers,
    info: {
      results: randomUsers.length,
      page: 1,
      seed: 'a',
      version: '1.0.0',
    },
  };
}

function createRandomUser(contact: IContact = createContact()): IRandomUser {
  return {
    login: { uuid: contact.id, username: contact.username },
    email: contact.email,
    name: {
      title: 'mr',
      first: contact.firstName,
      last: contact.lastName,
    },
    picture: {
      thumbnail: contact.pictureUrl,
      medium: contact.pictureMediumUrl,
      large: '',
    },
    phone: contact.phone,
    cell: contact.cell,
    location: {
      street: {
        name: contact.streetName,
        number: contact.streetNumber,
      },
      city: contact.city,
      state: contact.state,
      postcode: contact.postcode,
    },
  };
}

describe('ContactStore', () => {
  describe('addContacts', () => {
    test('should proper add more contacts', () => {
      const contactStore = new ContactStore();
      contactStore.contacts = [];
      const newContacts = [createContact(), createContact({ id: 'user-id-2' })];
      contactStore.addContacts(newContacts);
      expect(contactStore.contacts).toEqual(newContacts);
    });

    test('should proper handle empty parameter', () => {
      const contactStore = new ContactStore();
      contactStore.contacts = [];
      contactStore.addContacts(<never>null);
      contactStore.addContacts(<never>undefined);
      expect(contactStore.contacts).toEqual([]);
    });
  });
  describe('filteredContacts', () => {
    test('should return all items when searchTerm is empty', () => {
      const contactStore = new ContactStore();
      contactStore.contacts = [
        createContact(),
        createContact({ id: 'user-id-2' }),
      ];
      expect(contactStore.filteredContacts).toEqual(contactStore.contacts);
    });
    test('should proper filter when searchTerm is not empty', () => {
      const contactStore = new ContactStore();
      contactStore.searchTerm = 'filtered user';
      contactStore.contacts = [
        createContact({
          firstName: 'Filtered',
          lastName: 'User',
        }),
        createContact({ id: 'user-id-2' }),
      ];
      expect(contactStore.filteredContacts).toEqual([contactStore.contacts[0]]);
    });
    test('should proper filter when searchTerm is incomplete', () => {
      const contactStore = new ContactStore();
      contactStore.searchTerm = 'red us';
      contactStore.contacts = [
        createContact({
          firstName: 'Filtered',
          lastName: 'User',
        }),
        createContact({ id: 'user-id-2' }),
      ];
      expect(contactStore.filteredContacts).toEqual([contactStore.contacts[0]]);
    });
    test('should work proper when contacts list is an empty value', () => {
      const contactStore = new ContactStore();
      contactStore.searchTerm = 'red us';
      contactStore.contacts = <never>null;
      expect(contactStore.filteredContacts).toEqual([]);
    });
  });
  describe('mapToContact', () => {
    test('should proper map a random user to a contact', () => {
      const contact = createContact();
      const randomUser = createRandomUser(contact);
      const result = ContactStore.mapToContact([randomUser]);
      expect(result).toEqual([contact]);
    });
  });
  describe('loadContacts', () => {
    test('should proper load contacts when result is not empty', async () => {
      const contact = createContact();
      const randomUser = createRandomUser(contact);
      const randomUsersResponse = getRandomUsers([randomUser]);
      mockedRandomUserService.getUsersPaginated.mockResolvedValueOnce(
        randomUsersResponse,
      );
      const contactStore = new ContactStore();
      await contactStore.loadContacts({ page: 1, limit: 1, countries: [] });
      expect(contactStore.hasMore).toEqual(true);
      expect(contactStore.contacts).toEqual([contact]);
      expect(contactStore.loadingState).toEqual('success');
    });

    test('should proper load contacts when result is empty', async () => {
      const randomUsersResponse = getRandomUsers([]);
      mockedRandomUserService.getUsersPaginated.mockResolvedValueOnce(
        randomUsersResponse,
      );
      const contactStore = new ContactStore();
      await contactStore.loadContacts({ page: 1, limit: 0, countries: [] });
      expect(contactStore.hasMore).toEqual(false);
      expect(contactStore.contacts).toEqual([]);
      expect(contactStore.loadingState).toEqual('success');
    });

    test('should set hasMore as false when results is less than requested limit', async () => {
      const contact = createContact();
      const randomUser = createRandomUser(contact);
      const randomUsersResponse = getRandomUsers([randomUser]);
      mockedRandomUserService.getUsersPaginated.mockResolvedValueOnce(
        randomUsersResponse,
      );
      const contactStore = new ContactStore();
      await contactStore.loadContacts({ page: 1, limit: 2, countries: [] });
      expect(contactStore.hasMore).toEqual(false);
    });

    test('should proper handle request error', async () => {
      mockedRandomUserService.getUsersPaginated.mockRejectedValueOnce([]);
      const contactStore = new ContactStore();
      contactStore.loadContacts({
        page: 1,
        limit: 2,
        countries: [],
      });
      process.nextTick(() => {
        expect(contactStore.hasMore).toEqual(false);
        expect(contactStore.contacts).toEqual([]);
        expect(contactStore.loadingState).toEqual('error');
      });
    });
  });
});
