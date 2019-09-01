import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import './assets/fonts/iconfont.css';
import App from './container/App';
import { HashRouter as Router} from 'react-router-dom';

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));