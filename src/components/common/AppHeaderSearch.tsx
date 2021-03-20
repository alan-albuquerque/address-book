import Button from '@src/components/core/Button';
import React, { FunctionComponent, InputHTMLAttributes } from 'react';
import { FaSearch, FaTimesCircle } from 'react-icons/fa';

export interface AppHeaderSearchProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  descriptionSearch?: string;
  onCancel?: () => void;
}

const AppHeaderSearch: FunctionComponent<AppHeaderSearchProps> = props => {
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
        <label
          htmlFor={name}
          className="my-auto mx-1 px-2.5 pr-0 text-gray-500"
          data-testid="searchIcon"
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
        autoCorrect="off"
        aria-autocomplete="list"
        value={value}
        spellCheck={false}
        aria-describedby="descriptionSearch"
        data-testid="searchInput"
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
            data-testid="cancelIcon"
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
