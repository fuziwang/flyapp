import React, { Component } from 'react';
import { Layout,Input,Breadcrumb,Button,Modal} from 'antd';
import axios from 'axios';
import './index.css';

const { TextArea } = Input;
const { Content} = Layout;
const { confirm } = Modal;

export default class Text extends Component {
    constructor(){
        super();
        this.timer = null;
        this.state = {
            data:"",
            isOk:false,
            value:'',
            isable:false
        }
    }
    handleChange = (e)=>{
        this.setState({
            value:e.target.value,
            isable:false,
        })
    }

    handleClick = ()=>{
        var that = this;
        confirm({
            title: '确定要提交吗',
            okText: '确认',
            okType: 'primary',
            cancelText: '取消',
            onOk() {
                const params = {
                    account: localStorage.getItem('account'),
                    card:that.state.value
                }
                axios.post('/api/v1/dev/card/use', params).then(res => {
                    if(res.data.code == 1){
                        that.setState({
                            isOk: true,
                            isable: true,
                            value: '',
                            data: res.data.result // 这里需要改变
                        })
                        if (that.timer) clearTimeout(that.timer);
                        that.timer = setTimeout(() => {
                            that.setState({
                                isOk: false
                            });
                        }, 10000)
                    }
                });
            },
            onCancel() {
                // console.log('Cancel');
            },
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
                    <Breadcrumb>
                        <Breadcrumb.Item>App管理</Breadcrumb.Item>
                        <Breadcrumb.Item style={{color:'#333'}}>文本输入</Breadcrumb.Item>
                    </Breadcrumb>
                    <label htmlFor="text" className="info">这里是提示语内容</label>
                    < TextArea 
                        rows={8} 
                        style={{marginTop:'15px'}} 
                        placeholder="请输入内容" 
                        id="text" 
                        onChange={this.handleChange}
                        // value={this.state.value}
                    />
                    {this.state.isOk?<div style={{marginTop:'8px',marginLeft:'10px'}}>{
                        this.state.data.map((item,index)=>{
                            return <li key={index}>{item}</li>
                        })
                    }</div>:''}
                    <Button type = "primary" style={{float:'right',marginTop:'15px'}} onClick={this.handleClick} disabled={this.state.isable}> 提交 </Button>
                </Content>
            </Layout>
        )
    }
}
