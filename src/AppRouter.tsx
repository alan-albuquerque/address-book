import Loading from '@src/components/core/Loading';
import React, { ReactElement, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Settings = React.lazy(() => import('@src/pages/Settings'));
const Home = React.lazy(() => import('@src/pages/Home'));

function AppRouter(): ReactElement {
  function renderLoading() {
    return (
      <div className="w-screen h-screen flex justify-center items-center text-4xl">
        <Loading />
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        <Suspense fallback={renderLoading()}>
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
