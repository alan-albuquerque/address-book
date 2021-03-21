import { useStore } from '@src/store';
import { observer } from 'mobx-react-lite';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const HomeFiltersDetail: FunctionComponent = observer(() => {
  const { settingsStore } = useStore();

  return settingsStore.selectedCountries?.length ? (
    <div className="flex items-center px-1 py-3 text-sm">
      <div className="flex flex-col">
        <span className="mr-2 text-xs text-gray-700">
          Showing contacts from countries:
        </span>
        <div className="my-3">
          {settingsStore.selectedCountries.map(value => (
            <span className="mr-2 bg-purple-200 p-1 rounded-md" key={value}>
              {value}
            </span>
          ))}
        </div>
      </div>
      <Link
        className="ml-auto text-xs font-semibold text-purple-800 hover:underline w-20"
        to="/settings"
        aria-label="Settings page"
        title="Settings"
      >
        edit filters
      </Link>
    </div>
  ) : null;
});

export default HomeFiltersDetail;
