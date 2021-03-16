import AppHeader from '@src/components/AppHeader';
import ContactScrollList from '@src/components/ContactInfiniteList';
import Layout from '@src/components/core/layout/Layout';
import { useStore } from '@src/store';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { FunctionComponent, useEffect, useState } from 'react';

const Home: FunctionComponent = observer(() => {
  const [page, setPage] = useState<number>(1);

  const { contactStore } = useStore();

  useEffect(
    () =>
      autorun(() => {
        contactStore.loadContacts(page, 50);
      }),
    [contactStore, page],
  );

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Layout>
      <AppHeader />
      <div className="max-w-lg mx-auto">
        <ContactScrollList
          loading={contactStore.loading}
          contacts={contactStore.contacts}
          hasMore={contactStore.hasMore}
          loadMore={loadMore}
        />
      </div>
    </Layout>
  );
});

export default Home;
