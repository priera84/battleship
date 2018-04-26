import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import GameBoard from './Containers/GameBoard/GameBoard';
import { BrowserRouter, Route } from 'react-router-dom';
import GameSetup from './Components/GameSetup';


ReactDOM.render(<BrowserRouter>
                    <div>
                        <Route path="/" exact component={App} />
                        <Route path="/gameSetup" exact component={GameSetup} />
                        <Route path="/gameBoard" exact component={GameBoard} />
                    </div>
                </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
