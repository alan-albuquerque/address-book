import React, { FunctionComponent } from 'react';
import AppHeader from '@src/components/AppHeader';
import Layout from '@src/components/core/layout/Layout';

const Settings: FunctionComponent = () => {
  return (
    <Layout>
      <AppHeader />
      <div>settings</div>
    </Layout>
  );
};

export default Settings;
