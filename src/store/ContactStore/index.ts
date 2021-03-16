import { makeAutoObservable } from 'mobx';
import { IContact } from '@src/domain/Contact';
import {
  IRandomUser,
  randomUserService,
} from '@src/services/RandomUserService';
import { IContactStore } from './types';

export * from './types';

const CONTACTS_LIMIT = 100;

export class ContactStore implements IContactStore {
  contacts: IContact[] = [];

  loading = false;

  hasMore = false;

  constructor() {
    makeAutoObservable(this);
  }

  async loadContacts(page: number, limit: number): Promise<void> {
    this.loading = true;
    const { results, info } = await randomUserService.getUsersPaginated({
      page,
      results: limit,
    });
    if (info?.results > 0) {
      this.contacts.push(...ContactStore.mapToContact(results));
      this.hasMore =
        this.contacts.length < CONTACTS_LIMIT && info.results === limit;
    } else {
      this.hasMore = false;
    }
    this.loading = false;
  }

  static mapToContact(users: IRandomUser[]): IContact[] {
    return (
      users?.map(user => ({
        id: user?.login?.uuid,
        email: user?.email,
        firstName: user?.name?.first,
        lastName: user?.name?.last,
        pictureUrl: user?.picture?.thumbnail,
        username: user?.login?.username,
      })) || []
    );
  }
}
