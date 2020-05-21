import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css'
import Header from './components/header/header'
import NotFound from "./components/pages/NotFound";
import {withRouter} from 'react-router-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useRouteMatch
} from "react-router-dom";

import {Provider, provider} from 'react-redux'
import {store} from './store'

import PetMain from "./components/pages/main"
import Profile from "./components/pages/profile"

import jwt_decode from 'jwt-decode'
import {SET_CURRENT_USER} from "./store/actions/types";
import {refresh} from "./common/setAuthToken";
import axios from "axios";

if (localStorage.getItem('tokens')) {
  const accessToken = localStorage.getItem('tokens')
  axios.defaults.headers.common["Authorization"] = accessToken
  const payload = jwt_decode(accessToken)
  console.log(payload)
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: payload.sub
  })
}

function App() {
  return (
      <Provider store={store}>
        <Router>
        <Header/>
          <div className="App">
            {/*<Redirect from={'/'} to={"/"} />*/}
            <Switch>
              <Route path='/' exact={true} component={withRouter(PetMain)}/>
              <Route path='/profile' exact={true} component={withRouter(Profile)}/>
              {/*<Route exact path='/myfeed' component={withRouter(Myfeed)}/>*/}
              {/*<Route exact path='/' component={withRouter(Myfeed)}/>*/}
              <Route path='*' exact={true} component={withRouter(NotFound)}/>
            </Switch>
          </div>
        </Router>
      </Provider>
  );
}

export default App;
