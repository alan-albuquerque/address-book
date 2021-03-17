import createPersistence from './createPersistence';
import { ContactStore } from './ContactStore';
import { SettingsStore } from './SettingsStore';

export class RootStore {
  contactStore: ContactStore;

  settingsStore: SettingsStore;

  constructor() {
    this.contactStore = new ContactStore();
    this.settingsStore = createPersistence<SettingsStore>(new SettingsStore(), {
      name: 'SettingsStore',
      properties: ['selectedCountries'],
    });
  }
}
