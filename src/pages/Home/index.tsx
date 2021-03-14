import React, { FunctionComponent } from 'react';
import AppHeader from '@src/components/AppHeader';
import Layout from '@src/components/core/layout/Layout';
import ContactItem from '@src/components/ContactItem';

const Home: FunctionComponent = () => {
  return (
    <Layout>
      <AppHeader />
      <div>
        <ContactItem />
      </div>
    </Layout>
  );
};

export default Home;
