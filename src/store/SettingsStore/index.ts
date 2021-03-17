import { makeObservable, observable } from 'mobx';
import { ISettingsStore } from './types';

export * from './types';

export class SettingsStore implements ISettingsStore {
  countries: string[] = ['CH', 'ES', 'FR', 'GB'];

  selectedCountries: string[] = [];

  constructor() {
    makeObservable(this, {
      selectedCountries: observable,
    });
  }
}
