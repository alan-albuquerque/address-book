import { render } from '@testing-library/react';
import React from 'react';
import Layout from './index';

describe('<Layout />', () => {
  test('should proper render with a children', async () => {
    const { getByTestId } = render(
      <Layout>
        <div data-testid="testDiv" title="test div">
          test content
        </div>
      </Layout>,
    );
    const testDiv = getByTestId('testDiv');
    expect(testDiv).not.toBeNull();
    expect(testDiv.getAttribute('title')).toEqual('test div');
    expect(testDiv).toHaveTextContent('test content');
  });
});
