import AppHeader from '@src/components/AppHeader';
import Layout from '@src/components/core/layout/Layout';
import SettingsFiltersForm from '@src/pages/Settings/SettingsFiltersForm';
import React, { FunctionComponent } from 'react';

const Settings: FunctionComponent = () => {
  return (
    <Layout>
      <AppHeader title="Settings" />
      <div className="max-w-lg mx-auto">
        <SettingsFiltersForm />
      </div>
    </Layout>
  );
};

export default Settings;
