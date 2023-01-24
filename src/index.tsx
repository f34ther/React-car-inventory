import React from 'react';
import ReactDOM from 'react-dom';
import { Home } from './components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { FirebaseAppProvider, AuthCheck } from 'reactfire';
import './style.css';
import { firebaseConfig } from './firebaseConfig';
import 'firebase/auth';
import { Provider } from 'react-redux';
import { Inventory } from './components/Inventory';
import { About } from './components/About';
import { store } from './redux/store';

const temp_props = 'Car Inventory'

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={true}>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Home title={temp_props} />
            </Route>
            <Route path='/about'>
              <About></About>
            </Route>
            <Route path='/Inventory'>
              <Inventory></Inventory>
            </Route>
          </Switch>
        </Router>
      </Provider>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
