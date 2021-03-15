import { IContact } from '@src/domain/Contact';

export interface IContactStore {
  contacts: IContact[];

  loadContacts(page: number, limit: number): void;
}
