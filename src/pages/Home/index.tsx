import AppHeader from '@src/components/AppHeader';
import ContactInfiniteList from '@src/components/ContactInfiniteList';
import Layout from '@src/components/core/layout/Layout';
import Loading from '@src/components/core/Loading';
import HomeFiltersDetail from '@src/pages/Home/HomeFiltersDetail';
import { useStore } from '@src/store';
import { observer } from 'mobx-react-lite';
import React, { FunctionComponent, useCallback, useEffect } from 'react';

const Home: FunctionComponent = observer(() => {
  const { contactStore, settingsStore } = useStore();

  const loadMore = useCallback(() => {
    if (contactStore.searchTerm) return;
    contactStore.currentPage += 1;
    contactStore.loadContacts({
      page: contactStore.currentPage,
      limit: 50,
      countries: settingsStore.selectedCountries,
    });
  }, [settingsStore, contactStore]);

  useEffect(() => {
    if (contactStore.currentPage === 0) {
      loadMore();
    }
  }, [contactStore, loadMore]);

  const onSearch = (searchTerm: string) => {
    contactStore.searchTerm = searchTerm;
  };

  return (
    <Layout>
      <AppHeader searchTerm={contactStore.searchTerm} onSearch={onSearch} />
      <div className="max-w-lg mx-auto">
        <HomeFiltersDetail />
        <ContactInfiniteList
          loading={contactStore.loadingState === 'pending'}
          contacts={contactStore.filteredContacts}
          hasMore={contactStore.hasMore}
          loadMore={loadMore}
        />
        {contactStore.loadingState === 'pending' && (
          <div className="flex flex-row p-4 justify-center items-center">
            <Loading>loading...</Loading>
          </div>
        )}
        {contactStore.loadingState !== 'pending' && !contactStore.hasMore && (
          <div className="flex flex-row p-4 justify-center items-center">
            <div>end of users catalog</div>
          </div>
        )}
        {contactStore.searchTerm &&
          contactStore.hasMore &&
          !contactStore.filteredContacts.length && (
            <div className="flex flex-row p-4 justify-center items-center text-gray-700 font-semibold">
              Your search did not match any contacts
            </div>
          )}
        {contactStore.searchTerm &&
          contactStore.hasMore &&
          contactStore.contacts.length && (
            <div className="flex flex-row p-4 justify-center items-center text-gray-700">
              contacts loading paused while searching
            </div>
          )}
      </div>
    </Layout>
  );
});

export default Home;
