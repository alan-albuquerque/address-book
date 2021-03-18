import React, { FunctionComponent, InputHTMLAttributes } from 'react';
import Button from '@src/components/core/Button';
import { FaSearch, FaTimesCircle } from 'react-icons/fa';

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  descriptionSearch?: string;
  searchText?: string;
  onCancel: () => void;
}

const AppHeaderSearch: FunctionComponent<SearchProps> = props => {
  const {
    label = 'AppHeaderSearch',
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
        <label
          htmlFor={name}
          className="my-auto mx-1 px-2.5 pr-0 text-gray-500"
        >
          <FaSearch />
        </label>
      )}
      <input
        ref={searchInputRef}
        name={name}
        id={name}
        className="flex-grow p-3 outline-none rounded-3xl w-full"
        placeholder={label}
        value={value}
        autoCorrect="off"
        aria-autocomplete="list"
        spellCheck={false}
        aria-describedby="descriptionSearch"
        {...rest}
      />
      {value && (
        <div className="my-auto mx-1 px-2.5">
          <Button
            className="h-8 w-8"
            icon={<FaTimesCircle />}
            onClick={cancelSearch}
            aria-label="Clear search"
            title="Clear search"
          />
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

export default AppHeaderSearch;
