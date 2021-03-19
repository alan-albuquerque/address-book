import AppHeaderSearch from '@src/components/common/AppHeaderSearch';
import Button from '@src/components/core/Button';
import Header from '@src/components/core/Header';
import React, { FunctionComponent } from 'react';
import { FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export interface AppHeaderProps {
  onSearch?: (searchTerm: string) => void;
  searchTerm?: string;
  title?: string;
}

const AppHeader: FunctionComponent<AppHeaderProps> = ({
  onSearch,
  searchTerm = '',
  title = '',
}) => {
  const setSearchTextState = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) onSearch(event.target.value);
  };

  const clearSearchTextState = () => {
    if (onSearch) onSearch('');
  };

  return (
    <Header sticky>
      <div className="flex py-4 bg-white">
        <div
          className="
          flex flex-row justify-center items-center w-3/12 m-auto px-1.5
          text-center text-purple-800 text-base
          "
        >
          <Link
            to="/"
            title="Home"
            aria-label="Home page"
            data-testid="homeLink"
          >
            Address <span className="font-semibold">Book</span>
          </Link>
        </div>
        <div className="flex-initial w-6/12 h-14">
          {title && (
            <h1
              className="
              flex justify-center items-center h-full w-full text-2xl
              font-black text-gray-700
              "
              data-testid="headerTitle"
            >
              {title}
            </h1>
          )}
          {onSearch && (
            <AppHeaderSearch
              value={searchTerm}
              onChange={setSearchTextState}
              onCancel={clearSearchTextState}
              descriptionSearch="Start typing to search for contacts"
              data-testid="appSearch"
            />
          )}
        </div>
        <div className="flex flex-row items-center justify-center px-2 w-3/12">
          <Link
            to="/settings"
            className="mx-1"
            aria-label="Settings page"
            title="Settings"
            data-testid="settingsButton"
          >
            <Button className="h-8 w-8" tabIndex={-1} icon={<FaCog />} />
          </Link>
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
