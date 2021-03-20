import { useStore } from '@src/store';
import { observer } from 'mobx-react-lite';
import React, { FunctionComponent } from 'react';
import Select, { OptionTypeBase } from 'react-select';
import { ValueType } from 'react-select/src/types';

const SettingsFiltersForm: FunctionComponent = observer(() => {
  const { settingsStore, contactStore } = useStore();

  const countryOptions = settingsStore.countries.map(country => ({
    value: country,
    label: country,
  }));

  const countrySelectedOptions = countryOptions.filter(option =>
    settingsStore.selectedCountries.includes(option.value),
  );

  const handleCountryChange = (options: ValueType<OptionTypeBase, boolean>) => {
    const mappedValues = options?.map((option: OptionTypeBase) => option.value);
    settingsStore.updateSelectedCountries(mappedValues || []);
    contactStore.reset();
  };

  return (
    <div>
      <h2 className="font-semibold border-b my-3">Filters</h2>
      <label htmlFor="country" className="text-sm">
        Country
      </label>
      <Select
        id="country"
        options={countryOptions}
        onChange={handleCountryChange}
        defaultValue={countrySelectedOptions}
        isMulti
        value={countrySelectedOptions}
        closeMenuOnSelect={false}
        className="text-purple-800"
      />
    </div>
  );
});

export default SettingsFiltersForm;
