import React, { Component } from 'react'
import { Layout,Row, Col } from 'antd';
import axios from 'axios';
const { Header} = Layout;

export default class banner extends Component {
    handleClick =()=>{
        const params = {
            account:localStorage.getItem('account')
        }
        axios.get('/api/v1/dev/logout',{params:params}).then(res=>{
            console.log(res.data);
            if (res.data.code == 1 && res.data.result == true) {
                document.cookie = '';
                this.props.callback(false);
            }
        });
        this.props.callback(false);
    }
    render() {
        return (
            <Header className="header">
                <Row>
                    <Col span={20}><div style={{color:'#fff',fontSize:'24px'}}>开发者管理平台</div></Col>
                    <Col span={4}><div style={{color:'#fff',textAlign:'right',cursor:'pointer'}} onClick={this.handleClick}><i className="iconfont icon-tuichufffpx" style={{marginRight:'5px'}}/>退出</div></Col>
                </Row>
            </Header>
        )
    }
}
