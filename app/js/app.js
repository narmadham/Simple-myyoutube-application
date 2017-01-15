import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import '../styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './views/App';
import HomePage from './views/Home';
import MyList from './views/MyList';


import { Router, Route, IndexRoute, browserHistory } from 'react-router';

ReactDOM.render(

<Provider store={store}>
  <Router history={ browserHistory }>
    <Route path='/' component={ App }>
      <IndexRoute component={ HomePage } />
      <Route path='MyList' component={ MyList } />
    </Route>
  </Router>
</Provider>,
  document.getElementById('app')
);
