import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import AppHeader, { AppHeaderProps } from './index';

const renderAppHeader = (props: Partial<AppHeaderProps> = {}) => {
  return render(
    <MemoryRouter>
      <AppHeader {...props} />
    </MemoryRouter>,
  );
};

const renderAppHeaderWithRoute = (
  props: Partial<AppHeaderProps> = {},
  history: MemoryHistory,
) => {
  return render(
    <Router history={history}>
      <AppHeader {...props} />
    </Router>,
  );
};

const defaultProps: AppHeaderProps = {
  title: 'Test title',
  searchTerm: 'Test search term',
};

describe('<AppHeader />', () => {
  test('should render without any state', async () => {
    const { getByTestId, queryByTestId } = renderAppHeader();

    const homeLink = await getByTestId('homeLink');
    const headerTitle = await queryByTestId('headerTitle');
    const appSearch = await queryByTestId('appSearch');
    const homeButton = await queryByTestId('homeButton');
    const settingsButton = await queryByTestId('settingsButton');

    expect(homeLink).toHaveAttribute('title', 'Home');
    expect(homeLink).toHaveAttribute('aria-label', 'Home page');
    expect(homeLink).toHaveAttribute('href', '/');
    expect(homeLink).toHaveTextContent('Address Book');

    expect(headerTitle).toBeNull();
    expect(appSearch).toBeNull();

    expect(homeButton).not.toBeNull();
    expect(homeButton).toHaveAttribute('href', '/');
    expect(homeButton).not.toBeEmptyDOMElement();

    expect(settingsButton).not.toBeNull();
    expect(settingsButton).toHaveAttribute('href', '/settings');
    expect(settingsButton).not.toBeEmptyDOMElement();
  });

  test('should proper render with a title', async () => {
    const { getByTestId } = renderAppHeader({ title: defaultProps.title });

    const headerTitle = await getByTestId('headerTitle');

    expect(headerTitle).toHaveTextContent(defaultProps.title as string);
  });

  test('should proper render with a search callback', async () => {
    const { queryByTestId } = renderAppHeader({ onSearch: () => null });
    const appSearch = await queryByTestId('appSearch');

    expect(appSearch).not.toBeNull();
  });

  test('should navigates home when clicks the logo', async () => {
    const history = createMemoryHistory();
    const { getByTestId } = renderAppHeaderWithRoute({}, history);
    const homeLink = await getByTestId('homeLink');
    await fireEvent.click(homeLink);
    history.push('/test');
    await fireEvent.click(homeLink);
    expect(history.location.pathname).toEqual('/');
  });

  test('should navigates home when clicks the home button', async () => {
    const history = createMemoryHistory();
    const { getByTestId } = renderAppHeaderWithRoute({}, history);
    const homeButton = await getByTestId('homeButton');
    history.push('/test');
    await fireEvent.click(homeButton);
    expect(history.location.pathname).toEqual('/');
  });

  test('should navigates settings when clicks the settings button', async () => {
    const history = createMemoryHistory();
    const { getByTestId } = renderAppHeaderWithRoute({}, history);
    const settingsButton = await getByTestId('settingsButton');
    history.push('/test');
    await fireEvent.click(settingsButton);
    expect(history.location.pathname).toEqual('/settings');
  });
});
