import React, { Component } from 'react';
import { Layout,Table} from 'antd';
import axios from 'axios';
import './index.css';

const { Content} = Layout;

export default class DownLoad extends Component {
    constructor(){
      super();
      this.state = {
        current:1,
        data:[],
        length:0,
        basicdata: [{
          useful_amount: 0,
          registered_amount: 171
        }]
      }
      this.cols = [{
          title: '基础信息',      
          render: text=>{
            return <span className="used">剩余数：{text.useful_amount}<span style={{marginLeft:'15px'}}>已使用数：{text.registered_amount}</span></span>
          }
      }]
      this.columns = [
          {
            title: '添加时间',
            dataIndex: 'download_date',
            key: 'download_date',
            width:200
          },
          {
            title: '名称',
            dataIndex: 'app_name',
            key: 'app_name',
            width: 150
          },
          {
            title: '唯一号',
            dataIndex: 'UDID',
            key: 'UDID',
            width: 180
          },
          {
            title: '链接',
            dataIndex: 'url',
            key: 'url'
          },
          {
            title: '名称',
            dataIndex: 'bundleID',
            key: 'bundleID',
            width: 180
          }
        ];
    }
    componentDidMount = ()=>{
      const params = {
        account: localStorage.getItem('account')
      }
      axios.get('/api/v1/dev/user/download/apps', {params: params}).then(res => {
        let obj = [{
          useful_amount:res.data.useful_amount,
          registered_amount:res.data.registered_amount
        }]
        this.setState({
          data:res.data.app_list,
          length: res.data.app_list.length == 0 ? 0 : res.data.app_list.length,
          basicdata:obj
        })
      });
    }
    render() {
        return (
            <Layout style={{ padding: '0' }}>
                <Content
                style={{
                    background: '#fff',
                    padding: 24,
                    margin: 15,
                    marginRight:20
                }}>
                    <Table 
                      columns = {this.cols}
                      dataSource = {this.state.basicdata}// 这里需要改动
                      style={{clear:'both',paddingTop:'15px'}}
                      bordered
                      pagination={ false }
                    />
                    <Table
                      columns={this.columns}
                      bordered
                      dataSource={this.state.data}
                      style={{clear:'both',paddingTop:'15px'}}
                      scroll={{ y: document.body.scrollHeight - 535 }}// 需要改动
                      pagination={{
                        pageSize:20,
                        total: this.state.length
                      }}
                      title={() =>'注册详情'}
                    />
                </Content>
            </Layout>
        )
    }
}
