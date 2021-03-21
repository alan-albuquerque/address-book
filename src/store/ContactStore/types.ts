import { LoadingState } from '@src/@types/globals';
import { IContact } from '@src/domain/Contact';

export interface LoadContactsParams {
  page: number;
  limit: number;
  countries?: string[];
}

export interface IContactStore {
  contacts: IContact[];
  filteredContacts: IContact[];
  hasMore: boolean;
  searchTerm: string;
  currentPage: number;
  loadingState: LoadingState;

  loadContacts({ page, limit, countries }: LoadContactsParams): Promise<void>;
}
