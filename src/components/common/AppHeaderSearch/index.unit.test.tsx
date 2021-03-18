import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import AppHeaderSearch, { AppHeaderSearchProps } from './index';

const renderAppHeaderSearch = (props: Partial<AppHeaderSearchProps> = {}) => {
  return render(<AppHeaderSearch {...props} />);
};

const defaultProps: () => AppHeaderSearchProps = () => ({
  label: 'label test',
  descriptionSearch: 'aria description',
  value: 'initial search text',
  onCancel: jest.fn(),
  onChange: jest.fn(),
});

describe('<AppHeaderSearch />', () => {
  test('should proper render controls when search text is empty', async () => {
    const { getByTestId, queryByTestId } = renderAppHeaderSearch();
    const searchIcon = await getByTestId('searchIcon');
    const cancelIcon = await queryByTestId('cancelIcon');
    expect(searchIcon.innerHTML?.trim() || '').not.toEqual('');
    expect(cancelIcon).toBeNull();
  });

  test('should proper render controls when search text is not empty', async () => {
    const props = defaultProps();

    const { queryByTestId } = renderAppHeaderSearch({
      value: props.value,
      onChange: props.onChange,
    });
    const searchIcon = await queryByTestId('searchIcon');
    const cancelIcon = await queryByTestId('cancelIcon');
    expect(searchIcon).toBeNull();
    expect(cancelIcon).not.toBeNull();
  });

  test('should proper render search input', async () => {
    const props = defaultProps();
    const { getByTestId } = renderAppHeaderSearch(props);
    const searchInput = await getByTestId('searchInput');
    expect(searchInput.getAttribute('aria-describedby')).toEqual(
      'descriptionSearch',
    );
    expect(searchInput.getAttribute('placeholder')).toEqual(props.label);
    expect(searchInput.getAttribute('autoCorrect')).toEqual('off');
    expect(searchInput.getAttribute('aria-autocomplete')).toEqual('list');
    expect(searchInput.getAttribute('spellCheck')).toEqual('false');
  });

  test('should proper call cancel search', async () => {
    const props = defaultProps();
    const { getByTestId } = renderAppHeaderSearch(props);
    const cancelIcon = await getByTestId('cancelIcon');
    await fireEvent.click(cancelIcon);
    expect(props.onCancel).toHaveBeenCalledTimes(1);
  });

  test('should proper call onChange', async () => {
    const props = defaultProps();
    const { getByTestId } = renderAppHeaderSearch(props);
    const searchInput = await getByTestId('searchInput');
    await fireEvent.change(searchInput, { target: { value: 'term test' } });
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });
});
