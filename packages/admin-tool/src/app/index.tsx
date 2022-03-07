/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { Balance } from './pages/Balance';
import { Inventory } from './pages/Inventory';
import { Payments } from './pages/Payments';
import { NavBar } from './components/NavBar';
import { SideBar } from './components/SideBar';
import { Login } from './pages/Login';
import { ReactReduxContext } from 'react-redux';
import { useEffect } from 'react';
import { Signup } from './pages/Signup';
import { PointOfSale } from './pages/PointOfSale';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>
      <NavBar></NavBar>
      <>
        <Switch>
          <Route
            exact
            path={process.env.PUBLIC_URL + '/'}
            component={HomePage}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + '/login'}
            component={Login}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + '/balance'}
            component={Balance}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + '/inventory'}
            component={Inventory}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + '/payments'}
            component={Payments}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + '/signup'}
            component={Signup}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + '/pointofsales'}
            component={PointOfSale}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </>

      <GlobalStyle />
    </BrowserRouter>
  );
}
