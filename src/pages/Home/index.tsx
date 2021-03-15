import React, { FunctionComponent, useEffect, useState } from 'react';
import AppHeader from '@src/components/AppHeader';
import Layout from '@src/components/core/layout/Layout';
import ContactItem from '@src/components/ContactItem';
import { useStore } from '@src/store';
import { observer } from 'mobx-react-lite';
import { autorun } from 'mobx';
import ContactList from '@src/components/ContactList';

const Home: FunctionComponent = observer(() => {
  const batchLimit = 50;

  const [page] = useState<number>(1);

  const { contactStore } = useStore();

  useEffect(
    () =>
      autorun(() => {
        contactStore.loadContacts(page, batchLimit);
      }),
    [contactStore, page],
  );

  return (
    <Layout>
      <AppHeader />
      <div className="max-w-lg mx-auto">
        <ContactList>
          {contactStore.contacts.map(value => (
            <ContactItem {...value} clickable className="mb-2.5 mx-1" />
          ))}
        </ContactList>
      </div>
    </Layout>
  );
});

export default Home;
