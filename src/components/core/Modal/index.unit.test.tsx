import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Modal, { ModalProps } from './index';

const renderModal = (props: ModalProps = { isOpen: true }) => {
  const currentDiv = document.createElement('div');
  document.body.appendChild(currentDiv);
  return render(<Modal {...props} appElement={currentDiv as HTMLElement} />);
};

const defaultProps: () => ModalProps = () => ({
  title: 'modal title',
  isOpen: true,
  onRequestClose: jest.fn(),
});

describe('<Modal />', () => {
  test('should proper render', async () => {
    const props = { ...defaultProps(), children: <div>modal children</div> };
    const { getByTestId } = renderModal(props);

    const modalTitle = await getByTestId('modalTitle');
    const closeButton = await getByTestId('closeButton');
    const content = await getByTestId('content');

    expect(modalTitle).toHaveTextContent(props.title as string);
    expect(closeButton).toHaveAttribute('title', 'Close modal');
    expect(closeButton).toHaveAttribute('aria-label', 'Close modal');
    expect(content).toHaveTextContent('modal children' as string);
  });

  test('should proper call onClose callback', async () => {
    const props = defaultProps();
    const { getByTestId } = renderModal(props);
    const closeButton = await getByTestId('closeButton');

    await fireEvent.click(closeButton);

    expect(props.onRequestClose).toHaveBeenCalledTimes(1);
  });
});
