import React, { Component } from 'react'
import { Layout,Row, Col } from 'antd';
import axios from 'axios';
const { Header} = Layout;

export default class banner extends Component {
    handleClick =()=>{
        const params = {
            account:localStorage.getItem('account')
        }
        axios.defaults.withCredentials = true; //配置为true
        axios.get('/api/v1/dev/logout',{params:params}).then(res=>{
            console.log(res.data);
            if (res.data.code == 1 && res.data.result == true) {
                this.props.callback(false);
            }
        });
    }
    render() {
        return (
            <Header className="header">
                <Row>
                    <Col span={18}><div style={{color:'#fff',fontSize:'24px'}}>开发者管理平台</div></Col>
                    <Col span={6}><div style={{color:'#fff',textAlign:'right'}}><span style={{marginRight:'10px'}}>{localStorage.getItem('account')}</span><span onClick={this.handleClick}  style={{cursor:'pointer'}}><i className="iconfont icon-tuichufffpx" style={{marginRight:'5px'}}/>退出</span></div></Col>
                </Row>
            </Header>
        )
    }
}
