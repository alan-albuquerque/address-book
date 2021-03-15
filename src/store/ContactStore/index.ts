import { action, observable } from 'mobx';
import { IContact } from '@src/domain/Contact';
import {
  IRandomUser,
  randomUserService,
} from '@src/services/RandomUserService';
import { IContactStore } from './types';

export * from './types';

export class ContactStore implements IContactStore {
  @observable.shallow
  contacts: IContact[] = [];

  @action
  loadContacts(page: number, limit: number): void {
    randomUserService
      .getUsersPaginated({
        page,
        results: limit,
      })
      .then(response => {
        if (response.results) {
          this.contacts.push(...ContactStore.mapToContact(response.results));
        }
      });
  }

  static mapToContact(users: IRandomUser[]): IContact[] {
    return (
      users?.map(user => ({
        email: user?.email,
        firstName: user?.name?.first,
        lastName: user?.name?.last,
        pictureUrl: user?.picture?.thumbnail,
        username: user?.login?.username,
      })) || []
    );
  }
}
