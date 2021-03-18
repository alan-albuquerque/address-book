import ContactItem from '@src/components/contact/ContactItem';
import ContactList from '@src/components/contact/ContactList';
import { IContact } from '@src/domain/Contact';
import { observer } from 'mobx-react-lite';
import React, {
  FunctionComponent,
  HTMLAttributes,
  useCallback,
  useRef,
} from 'react';

export interface ContactScrollListProps extends HTMLAttributes<HTMLDivElement> {
  loading: boolean;
  hasMore: boolean;
  contacts: IContact[];
  onClickContact?: (contact: IContact) => void;
  loadMore: () => void;
}

const ContactInfiniteList: FunctionComponent<ContactScrollListProps> = ({
  loading,
  contacts,
  hasMore,
  loadMore,
  onClickContact,
  ...rest
}) => {
  const refObserver = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    node => {
      if (loading) return;
      refObserver?.current?.disconnect();
      refObserver.current = new IntersectionObserver(entries => {
        if (entries?.length && entries[0].isIntersecting && hasMore) {
          if (loadMore) loadMore();
        }
      });
      if (node) refObserver.current.observe(node);
    },
    [loadMore, loading, hasMore],
  );

  const renderContactItem = (contact: IContact) => {
    return (
      <ContactItem
        username={contact?.username}
        pictureUrl={contact?.pictureUrl}
        firstName={contact?.firstName}
        email={contact?.email}
        lastName={contact?.lastName}
        clickable
        className="mb-2.5 mx-1"
        onClick={() => onClickContact && onClickContact(contact)}
      />
    );
  };

  return (
    <div {...rest}>
      <ContactList>
        {contacts?.map((contact, index) => {
          if (contacts.length === index + 1) {
            return (
              <div ref={lastElementRef} key={contact.id}>
                {renderContactItem(contact)}
              </div>
            );
          }
          return <div key={contact.id}>{renderContactItem(contact)}</div>;
        })}
      </ContactList>
    </div>
  );
};

export default observer(ContactInfiniteList);
