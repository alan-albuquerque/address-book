import Button from '@src/components/core/Button';
import Header from '@src/components/core/layout/Header';
import Search from '@src/components/Search';
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
          flex-initial w-1/5 m-auto px-1.5
          text-center text-purple-800 text-xs sm:text-base
          "
        >
          <Link to="/" title="Home" aria-label="Home page">
            Address <span className="font-semibold">Book</span>
          </Link>
        </div>
        <div className="flex-initial w-3/5 h-14">
          {title && (
            <h1
              className="
              flex justify-center items-center h-full w-full text-2xl
              font-black text-gray-700
              "
            >
              {title}
            </h1>
          )}
          {onSearch && (
            <Search
              value={searchTerm}
              onChange={setSearchTextState}
              onCancel={clearSearchTextState}
              descriptionSearch="Start typing to search for contacts"
            />
          )}
        </div>
        <div className="flex flex-col justify-center px-2 w-1/5">
          <Link to="/settings" aria-label="Settings page" title="Settings">
            <Button className="h-8 w-8" icon={<FaCog />} />
          </Link>
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
