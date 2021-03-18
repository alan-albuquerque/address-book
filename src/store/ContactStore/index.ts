import { LoadingState } from '@src/@types/globals';
import { IContact } from '@src/domain/Contact';
import {
  IRandomUser,
  IRandomUserResponse,
  randomUserService,
} from '@src/services/RandomUserService';
import { makeAutoObservable } from 'mobx';
import { IContactStore, LoadContactsParams } from './types';

export * from './types';

const CONTACTS_LIMIT = 1000;

export class ContactStore implements IContactStore {
  contacts: IContact[] = [];

  loadingState: LoadingState = 'inactive';

  hasMore = false;

  searchTerm = '';

  currentPage = 0;

  constructor() {
    this.reset();
    makeAutoObservable(this);
  }

  reset(): void {
    this.contacts = [];
    this.loadingState = 'inactive';
    this.hasMore = false;
    this.searchTerm = '';
    this.currentPage = 0;
  }

  addContacts(newValue: IContact[]): void {
    this.contacts.push(...newValue);
  }

  get filteredContacts(): IContact[] {
    return this.contacts.filter(contact => {
      return `${contact.firstName} ${contact.lastName}`
        .toLowerCase()
        .trim()
        .includes(this.searchTerm.toLowerCase().trim());
    });
  }

  loadContacts({ page, limit, countries }: LoadContactsParams): void {
    this.loadingState = 'pending';
    randomUserService
      .getUsersPaginated({
        page,
        results: limit,
        nat: countries?.join(','),
      })
      .then(resp => this.loadContactsSuccessHandler(resp, limit))
      .catch(this.errorHandler);
  }

  private loadContactsSuccessHandler(
    { results, info }: IRandomUserResponse<IRandomUser>,
    limit: number,
  ): void {
    if (info?.results > 0) {
      this.addContacts(ContactStore.mapToContact(results));
      this.hasMore =
        this.contacts.length < CONTACTS_LIMIT && info.results === limit;
    } else {
      this.hasMore = false;
    }
    this.successHandler();
  }

  private successHandler(): void {
    this.loadingState = 'success';
  }

  private errorHandler(): void {
    this.loadingState = 'error';
  }

  static mapToContact(users: IRandomUser[]): IContact[] {
    return (
      users?.map(user => ({
        id: user?.login?.uuid,
        email: user?.email,
        firstName: user?.name?.first,
        lastName: user?.name?.last,
        pictureUrl: user?.picture?.thumbnail,
        pictureMediumUrl: user?.picture?.medium,
        username: user?.login?.username,
        phone: user?.phone,
        cell: user?.cell,
        streetName: user?.location?.street?.name,
        streetNumber: user?.location?.street?.number,
        city: user?.location?.city,
        state: user?.location?.state,
        postcode: user?.location?.postcode,
      })) || []
    );
  }
}
