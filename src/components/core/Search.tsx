import React, { FunctionComponent, InputHTMLAttributes } from 'react';
import SearchIcon from '@src/assets/icons/search.svg';
import CancelIcon from '@src/assets/icons/cancel.svg';

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  descriptionSearch?: string;
  searchText?: string;
  onCancel: () => void;
}

const Search: FunctionComponent<SearchProps> = props => {
  const {
    label = 'Search',
    name = 'searchInput',
    descriptionSearch,
    value,
    onCancel,
    ...rest
  } = props;

  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const focusTextInput = () => {
    if (searchInputRef && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const cancelSearch = () => {
    if (onCancel) onCancel();
    focusTextInput();
  };

  return (
    <div className="flex flex-row border-2 rounded-3xl">
      {!value && (
        <label htmlFor={name} className="my-auto mx-1 px-2.5 pr-0">
          <SearchIcon fill="currentColor" className="w-5 h-5 text-gray-500" />
        </label>
      )}
      <input
        ref={searchInputRef}
        name={name}
        id={name}
        className="flex-grow p-3 outline-none rounded-3xl"
        placeholder={label}
        value={value}
        autoCorrect="off"
        aria-autocomplete="list"
        aria-describedby="descriptionSearch"
        {...rest}
      />
      {value && (
        <div className="my-auto mx-1 px-2.5 h-5">
          <button
            type="button"
            aria-label="Reset search input"
            onClick={cancelSearch}
          >
            <div className="w-5 h-5">
              <CancelIcon
                fill="currentColor"
                className="text-gray-500 hover:text-purple-800"
              />
            </div>
          </button>
        </div>
      )}
      {descriptionSearch && (
        <div id="descriptionSearch" className="hidden">
          {descriptionSearch}
        </div>
      )}
    </div>
  );
};

export default Search;
