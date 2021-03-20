import { render } from '@testing-library/react';
import React from 'react';
import Loading from '@src/components/core/Loading';

describe('<Loading />', () => {
  test('should proper render with a children', async () => {
    const { getByTestId } = render(
      <Loading>
        <div data-testid="testDiv" title="test div">
          test content
        </div>
      </Loading>,
    );
    const testDiv = getByTestId('testDiv');
    const loadingIcon = getByTestId('loadingIcon');
    expect(loadingIcon).not.toBeNull();
    expect(testDiv).not.toBeNull();
    expect(testDiv.getAttribute('title')).toEqual('test div');
    expect(testDiv).toHaveTextContent('test content');
  });
});
