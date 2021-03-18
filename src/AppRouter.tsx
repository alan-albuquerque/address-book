import Loading from '@src/components/core/Loading';
import React, { ReactElement, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Settings = React.lazy(() => import('@src/pages/Settings'));
const Home = React.lazy(() => import('@src/pages/Home'));

function AppRouter(): ReactElement {
  return (
    <Router>
      <Switch>
        <Suspense fallback={<Loading />}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
        </Suspense>
      </Switch>
    </Router>
  );
}

export default AppRouter;
