import React, { Component } from 'react'
import Banner from './banner';
import Nav from './nav';
import Content from './content';
import { Layout} from 'antd';
import Login from '../component/login';

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
          <Content/>
        </Layout>
      </Layout>:<Login callback={this.callback}/>
    );
  }
}
