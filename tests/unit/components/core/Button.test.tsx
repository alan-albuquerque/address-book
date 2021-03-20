import React from 'react';

import { render } from '@testing-library/react';
import Button, { ButtonProps } from '@src/components/core/Button';

const renderButton = (props: Partial<ButtonProps> = {}) => {
  return render(<Button {...props} />);
};

describe('<Button />', () => {
  test('should proper render', async () => {
    const { getByRole } = renderButton();
    const button = getByRole('button');

    expect(button).not.toBeNull();
    expect(button).toHaveAttribute('type', 'button');
  });

  test('should proper render with children without icon', async () => {
    const { getByTestId } = render(
      <Button>
        <div data-testid="testDiv" title="test div">
          test content
        </div>
      </Button>,
    );
    const testDiv = getByTestId('testDiv');

    expect(testDiv).not.toBeNull();
    expect(testDiv.getAttribute('title')).toEqual('test div');
    expect(testDiv).toHaveTextContent('test content');
  });

  test('should proper render with children with an icon', async () => {
    const { getByRole, getByTestId } = render(
      <Button icon={<span data-testid="myIcon">myIcon</span>}>
        test content
      </Button>,
    );
    const button = getByRole('button');
    const myIcon = getByTestId('myIcon');

    expect(button).toHaveTextContent('test content');
    expect(myIcon).toHaveTextContent('myIcon');
  });

  test('should proper render with only an icon', async () => {
    const { getByRole, getByTestId } = render(
      <Button icon={<span data-testid="myIcon">myIcon</span>} />,
    );
    const button = getByRole('button');
    const myIcon = getByTestId('myIcon');

    expect(button).toHaveTextContent('myIcon');
    expect(myIcon).not.toBeNull();
  });
});
