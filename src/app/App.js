import React, { Component } from 'react';
import { HashRouter, Redirect, Route } from "react-router-dom";

import { api } from '../services';

import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';

import {
  Footer,
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
    isAuthenticated: false,
    isLoaded: false,
    page: 'home',
    userData: {
      banks: []
    },
  }

  constructor(props) {
    super(props);

    this.setAuthenticated = this.setAuthenticated.bind(this);
    this.setPage = this.setPage.bind(this);
    this.setUserData = this.setUserData.bind(this);

    this.logout = this.logout.bind(this);
    this.closeModal = this.closeModal.bind(this);

    if (history.location.pathname !== '/') {
      history.push('/#' + history.location.pathname);
    }
  }

  async componentDidMount() {
    const customerId = localStorage.getItem('customerId');
    const token = localStorage.getItem('token');

    if (token && customerId)
      this.setAuthenticated(true)
    else
      this.setAuthenticated(false)

    // this.getAccessToken();
  }

  setUserData(userData) {
    this.setState({ userData })
  }

  async getAccessToken() {
    try {
      const { data } = await api.post('/token');
      localStorage.setItem('token', data)
    }
    catch (e) {
      console.log(e)
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
    localStorage.clear();
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
      isAuthenticated,
      isLoaded,
      page,

      isOpenModal
    } = this.state;

    return (
      <HashRouter>
        <Route render={
          ({ location, history }) =>
            isLoaded &&
            <React.Fragment>
              {
                isAuthenticated &&
                <Sidenav
                logout={this.logout}
                  setPage={this.setPage}
                />
              }
              <main className="app-main">
                <PrivateRoute auth={isAuthenticated}
                  path="/home" exact
                  component={props =>
                    <Home
                      page={page}
                    />
                  }
                />
                <Route
                  path="/login" exact
                  component={props =>
                    <LoginPage
                      {...props}
                      setAuthenticated={this.setAuthenticated}
                      setUserData={this.setUserData}
                    />
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
