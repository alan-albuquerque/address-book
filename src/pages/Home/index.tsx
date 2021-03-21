import AppHeader from '@src/components/common/AppHeader';
import ContactDetail from '@src/components/contact/ContactDetail';
import ContactInfiniteList from '@src/components/contact/ContactInfiniteList';
import Layout from '@src/components/core/Layout';
import Loading from '@src/components/core/Loading';
import Modal from '@src/components/core/Modal';
import { IContact } from '@src/domain/Contact';
import HomeFiltersDetail from '@src/pages/Home/HomeFiltersDetail';
import { useStore } from '@src/store';
import { observer } from 'mobx-react-lite';

import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { forceCheck } from 'react-lazyload';
import { useCallbackRef } from 'use-callback-ref';

const Home: FunctionComponent = observer(() => {
  const { contactStore, settingsStore } = useStore();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [openedContact, setOpenedContact] = useState<Partial<IContact>>();
  const appHeaderRef = useRef<HTMLDivElement>(null);
  const loadingRef = useCallbackRef<HTMLDivElement>(null, () => {
    if (contactStore.currentPage > 1) {
      // moves the screen down so that the user can see the loading indicator
      // and the next page when it appear
      window.scrollTo(0, document.body.scrollHeight);
    }
  });

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

  function onSearch(searchTerm: string) {
    contactStore.searchTerm = searchTerm;
    setTimeout(() => {
      forceCheck();
    }, 100);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function openModal() {
    setModalIsOpen(true);
  }

  const onClickContact = useCallback((contact: IContact) => {
    setOpenedContact(contact);
    openModal();
  }, []);

  return (
    <Layout>
      <AppHeader
        ref={appHeaderRef}
        searchTerm={contactStore.searchTerm}
        onSearch={onSearch}
      />
      <div className="max-w-lg mx-auto px-2">
        <HomeFiltersDetail />
        <ContactInfiniteList
          loading={contactStore.loadingState === 'pending'}
          contacts={contactStore.filteredContacts}
          hasMore={contactStore.hasMore}
          loadMore={loadMore}
          onClickContact={onClickContact}
        />
        {contactStore.loadingState === 'pending' && (
          <div
            ref={loadingRef}
            className="flex flex-row p-8 justify-center items-center"
          >
            <Loading>loading...</Loading>
          </div>
        )}
        {contactStore.loadingState === 'success' && !contactStore.hasMore && (
          <div className="p-4 text-center text-gray-700 ">
            end of users catalog
          </div>
        )}
        {contactStore.searchTerm &&
          contactStore.hasMore &&
          !contactStore.filteredContacts.length && (
            <div className="p-4 text-center text-gray-700 font-semibold">
              Your search did not match any contacts
            </div>
          )}
        {contactStore.searchTerm &&
          contactStore.hasMore &&
          contactStore.contacts.length && (
            <div className="p-4 text-center text-gray-700">
              contacts loading paused while searching
            </div>
          )}
        {contactStore.loadingState === 'error' && (
          <div className="p-4 text-center text-red-800 ">
            An error occurred while requesting the contact list, please try
            again.
          </div>
        )}
      </div>
      <Modal title="Contact" isOpen={modalIsOpen} onRequestClose={closeModal}>
        <ContactDetail contact={openedContact} />
      </Modal>
    </Layout>
  );
});

export default Home;
