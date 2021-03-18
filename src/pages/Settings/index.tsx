import AppHeader from '@src/components/common/AppHeader';
import Layout from '@src/components/core/Layout';
import SettingsFiltersForm from '@src/pages/Settings/SettingsFiltersForm';
import React, { FunctionComponent } from 'react';

const Settings: FunctionComponent = () => {
  return (
    <Layout>
      <AppHeader title="Settings" />
      <div className="max-w-lg mx-auto px-2">
        <SettingsFiltersForm />
      </div>
    </Layout>
  );
};

export default Settings;
