import { render } from '@testing-library/react';
import React from 'react';
import Header from '@src/components/core/Header';

describe('<Header />', () => {
  test('should proper render with a children', async () => {
    const { getByTestId } = render(
      <Header>
        <div data-testid="testDiv" title="test div">
          test content
        </div>
      </Header>,
    );
    const testDiv = getByTestId('testDiv');
    expect(testDiv).not.toBeNull();
    expect(testDiv.getAttribute('title')).toEqual('test div');
    expect(testDiv).toHaveTextContent('test content');
  });
});
