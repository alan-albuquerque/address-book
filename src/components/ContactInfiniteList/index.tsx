import ContactItem from '@src/components/ContactItem';
import ContactList from '@src/components/ContactList';
import Loading from '@src/components/core/Loading';
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
  loadMore: () => void;
}

const ContactScrollList: FunctionComponent<ContactScrollListProps> = observer(
  ({ loading, contacts, hasMore, loadMore, ...rest }) => {
    const refObserver = useRef<IntersectionObserver>();

    const lastElementRef = useCallback(
      node => {
        if (loading) return;
        refObserver?.current?.disconnect();
        refObserver.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && hasMore) {
            if (loadMore) loadMore();
          }
        });
        if (node) refObserver.current.observe(node);
      },
      [loadMore, loading, hasMore],
    );

    function renderContactItem(contact: IContact) {
      return <ContactItem {...contact} clickable className="mb-2.5 mx-1" />;
    }

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
        {loading && (
          <div className="flex flex-row p-4 justify-center items-center">
            <Loading>loading...</Loading>
          </div>
        )}
        {!hasMore && (
          <div className="flex flex-row p-4 justify-center items-center">
            <div>end of users catalog.</div>
          </div>
        )}
      </div>
    );
  },
);

export default ContactScrollList;
