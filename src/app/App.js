import React, { Component } from 'react';
import { HashRouter, Redirect, Route } from "react-router-dom";
import Cookies from 'universal-cookie';

import { config, stage } from '../config';
import { api } from '../services';

import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';

import {
  Footer,
  Topnav,
  Sidenav,
} from '../components';

import './App.css';

// Create history object.
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      rest.auth === true
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )
}

class App extends Component {

  state = {
    appLoaded: false,
    isAuthenticated: false,
    isLoaded: false,
    page: 'transfer',
  }

  constructor(props) {
    super(props);

    this.refreshUserData = this.refreshUserData.bind(this);
    this.setAuthenticated = this.setAuthenticated.bind(this);
    this.setPage = this.setPage.bind(this);

    this.logout = this.logout.bind(this);
    this.closeModal = this.closeModal.bind(this);

    if (history.location.pathname !== '/') {
      history.push('/#' + history.location.pathname);
    }
  }

  async componentDidMount() {
    try {
      await this.refreshUserData();
    }
    catch (e) {
      console.log(e)
    }
    finally {
      this.setState({
        appLoaded: true,
        isMobile: window.innerWidth < 600,
        isTablet: window.innerWidth < 960
      })
    }
  }

  async refreshUserData() {
    try {
      const cwid = localStorage.getItem('cwid');

      this.setAuthenticated(true);
    }
    catch (e) {
      this.setAuthenticated(false);
    }
  }

  setAuthenticated(auth) {
    const state = {
      isAuthenticated: auth,
      isLoaded: true,
    }
    this.setState(state);
  }

  logout() {
    // Clear token cookie and localStorage then remove authentication
    const cookies = new Cookies();
    cookies.remove('token');

    // localStorage.clear();
    localStorage.removeItem('cwid');

    this.setState({ isAuthenticated: false })
  }

  closeModal() {
    this.setState({ isOpenModal: false });
  }

  setPage(page) {
    this.setState({ page });
  }

  render() {
    const {
      appLoaded,
      isAuthenticated,
      isLoaded,
      isMobile,
      page,

      isOpenModal
    } = this.state;

    return (
      <HashRouter>
        <Route render={
          ({ location, history }) =>
            isLoaded && appLoaded &&
            <React.Fragment>
              {
                isAuthenticated &&
                <Sidenav
                  setPage={this.setPage}
                />
                // <Topnav
                //   appLoaded={appLoaded}
                //   logout={this.logout}
                // />
              }
              <main className="app-main">
                <PrivateRoute auth={isAuthenticated}
                  path="/home" exact
                  component={props =>
                    <Home
                      isMobile={isMobile}
                      appLoaded={appLoaded}
                      page={page}
                    />
                  }
                />
                <Route
                  path="/login" exact
                  component={props =>
                    <LoginPage {...props} refreshUserData={this.refreshUserData} />
                  }
                />
              </main>
              {
                isAuthenticated &&
                <Footer />
              }
              {
                !isAuthenticated &&
                < Redirect from={'*'} to={'/login'} />
              }
              {
                (isAuthenticated && (window.location.hash === '#/' || window.location.hash.includes('login'))) ? history.push('/home') : null
              }
            </React.Fragment>
        }
        />
      </HashRouter>
    );
  }
}

export default App;
