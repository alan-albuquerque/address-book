import { IContact } from '@src/domain/Contact';

export interface IContactStore {
  contacts: IContact[];
  filteredContacts: IContact[];
  loading: boolean;
  hasMore: boolean;
  searchTerm: string;
  currentPage: number;

  loadContacts(page: number, limit: number): void;
}
