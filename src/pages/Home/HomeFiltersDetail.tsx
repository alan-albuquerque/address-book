import { useStore } from '@src/store';
import { observer } from 'mobx-react-lite';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const HomeFiltersDetail: FunctionComponent = observer(() => {
  const { settingsStore } = useStore();

  return (
    <div className="flex items-center px-1 py-3 text-sm">
      <span className="mr-2">Filtering contacts from countries:</span>
      {settingsStore.selectedCountries.map(value => (
        <span className="mr-2 bg-purple-200 p-1 rounded-md" key={value}>
          {value}
        </span>
      ))}
      <Link
        className="ml-auto hover:text-purple-800"
        to="/settings"
        aria-label="Settings page"
        title="Settings"
      >
        edit filters
      </Link>
    </div>
  );
});

export default HomeFiltersDetail;
