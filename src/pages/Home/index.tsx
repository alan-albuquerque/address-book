import AppHeader from '@src/components/AppHeader';
import ContactScrollList from '@src/components/ContactInfiniteList';
import Layout from '@src/components/core/layout/Layout';
import { useStore } from '@src/store';
import { observer } from 'mobx-react-lite';
import React, { FunctionComponent, useCallback, useEffect } from 'react';

const Home: FunctionComponent = observer(() => {
  const { contactStore } = useStore();

  const loadMore = useCallback(() => {
    if (contactStore.searchTerm) return;
    contactStore.currentPage += 1;
    contactStore.loadContacts(contactStore.currentPage, 50);
  }, [contactStore]);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  const onSearch = (searchTerm: string) => {
    contactStore.searchTerm = searchTerm;
  };

  return (
    <Layout>
      <AppHeader searchTerm={contactStore.searchTerm} onSearch={onSearch} />
      <div className="max-w-lg mx-auto">
        <ContactScrollList
          loading={contactStore.loading}
          contacts={contactStore.filteredContacts}
          hasMore={contactStore.hasMore}
          loadMore={loadMore}
        />
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
