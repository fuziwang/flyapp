import React, { Component } from 'react'
import Banner from './banner';
import Nav from './nav';
import Home from './content/home';
import DownLoad from './content/download';
import Text from './content/text';
import { Layout} from 'antd';
import Login from '../component/login';
import { Route,Switch} from 'react-router-dom';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      islogin:false
    }
  }
  callback = (islogin)=>{
    this.setState({
      islogin:islogin
    })
  }
  render(){
    var cookie = document.cookie.split('=');
    return (
      this.state.islogin || cookie[0] == 'login'?
      <Layout style={{height:'100%'}}>
        <Banner callback={this.callback}/>
        <Layout style={{height:'100%'}}>
          <Nav/>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/download" component={DownLoad}/>
              <Route exact path="/text" component={Text}/>
          </Switch>
        </Layout>
      </Layout>:<Login callback={this.callback}/>
    );
  }
}
