import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Auth from './fakeAuth';
import AuthNew from "./authInterface";
import registerServiceWorker from './registerServiceWorker';
import ChangeTest from "./components/test/changeTest"


ReactDOM.render(<AuthNew />, document.getElementById('root'));
registerServiceWorker();
