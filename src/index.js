import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import GameBoard from './Containers/GameBoard/GameBoard';
import { BrowserRouter, Route } from 'react-router-dom';
import GameSetup from './Components/GameSetup';

if (process.env.NODE_ENV !== 'production') {
    const {whyDidYouUpdate} = require('why-did-you-update')
    whyDidYouUpdate(React);
  }


ReactDOM.render(<BrowserRouter>
                    <div>
                        <Route path="/" exact component={App} />
                        <Route path="/gameSetup" exact component={GameSetup} />
                        <Route path="/gameBoard" exact component={GameBoard} />
                    </div>
                </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
