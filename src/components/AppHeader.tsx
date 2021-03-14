import React, { FunctionComponent } from 'react';
import Header from '@src/components/core/layout/Header';
import Search from '@src/components/Search';
import Button from '@src/components/core/Button';
import { FaCog } from 'react-icons/fa';

const AppHeader: FunctionComponent = () => {
  const [searchText, setSearchText] = React.useState('');

  const setSearchTextState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const clearSearchTextState = () => {
    setSearchText('');
  };

  return (
    <Header>
      <div className="flex py-4">
        <div
          className="
          flex-initial w-1/5 m-auto px-1.5
          text-center font-semibold text-purple-800 text-xs sm:text-base
          "
        >
          Address Book
        </div>
        <div className="flex-initial w-3/5">
          <Search
            value={searchText}
            onChange={setSearchTextState}
            onCancel={clearSearchTextState}
            descriptionSearch="Start typing to search for contacts"
          />
        </div>
        <div className="flex flex-col justify-center px-2 w-1/5">
          <Button
            className="h-8 w-8"
            title="Settings"
            icon={<FaCog />}
            role="link"
            aria-label="Open settings page"
          />
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
