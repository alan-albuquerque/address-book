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
  useState,
} from 'react';

const Home: FunctionComponent = observer(() => {
  const { contactStore, settingsStore } = useStore();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [openedContact, setOpenedContact] = useState<Partial<IContact>>();

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
      <AppHeader searchTerm={contactStore.searchTerm} onSearch={onSearch} />
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
      <Modal title="Contact" isOpen={modalIsOpen} onRequestClose={closeModal}>
        <ContactDetail contact={openedContact} />
      </Modal>
    </Layout>
  );
});

export default Home;
