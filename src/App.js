import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Settings from './Settings';
import Image from './Image';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/image' component={Image} />
        <Route exact path='/settings' component={Settings} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
