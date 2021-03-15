import { ContactStore } from './ContactStore';

export class RootStore {
  contactStore: ContactStore;

  constructor() {
    this.contactStore = new ContactStore();
  }
}
