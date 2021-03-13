import React, { FunctionComponent } from 'react';
import Header from '@src/components/core/layout/Header';
import Search from '@src/components/core/Search';

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
      <div className="flex">
        <div className="flex-initial w-1/5 m-auto text-center font-semibold text-purple-800">
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
        <div className="flex-initial w-1/5">Settings</div>
      </div>
    </Header>
  );
};

export default AppHeader;
