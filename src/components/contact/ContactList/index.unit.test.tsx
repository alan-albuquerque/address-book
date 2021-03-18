import React from 'react';

import { render } from '@testing-library/react';
import ContactList, { ContactListProps } from './index';

const renderContactList = (props: Partial<ContactListProps> = {}) => {
  return render(<ContactList {...props} />);
};

describe('<ContactList />', () => {
  test('should proper render', async () => {
    const { getByTestId } = renderContactList({ title: 'test' });
    const rootEl = getByTestId('contactListRootEl');
    expect(rootEl).not.toBeNull();
    expect(rootEl.getAttribute('title')).toEqual('test');
  });

  test('should proper render with children', async () => {
    const { getByTestId } = render(
      <ContactList>
        <div data-testid="testDiv" title="test div">
          test content
        </div>
      </ContactList>,
    );
    const testDiv = getByTestId('testDiv');
    expect(testDiv).not.toBeNull();
    expect(testDiv.getAttribute('title')).toEqual('test div');
    expect(testDiv).toHaveTextContent('test content');
  });
});
