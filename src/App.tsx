import React, { ReactElement } from 'react';
import Home from '@src/views/Home';
import Layout from '@src/components/core/layout/Layout';

function App(): ReactElement {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

export default App;
