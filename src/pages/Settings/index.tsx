import AppHeader from '@src/components/common/AppHeader';
import Button from '@src/components/core/Button';
import Layout from '@src/components/core/Layout';
import SettingsFiltersForm from '@src/pages/Settings/SettingsFiltersForm';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const Settings: FunctionComponent = () => {
  return (
    <Layout>
      <AppHeader title="Settings" />
      <div className="max-w-lg mx-auto px-2">
        <SettingsFiltersForm />
        <Link
          className="font-semibold w-20 flex-grow contents"
          to="/"
          aria-label="Apply filters and go to the contacts list"
          title="Apply filters and go to the contacts list"
        >
          <Button
            icon={<FaCheckCircle />}
            tabIndex={0}
            className="border mt-6 text-sm text-purple-800 "
          >
            Apply filters
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default Settings;
