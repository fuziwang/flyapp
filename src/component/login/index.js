import React, { Component } from 'react'
import { Form,Input, Button} from 'antd';
import './index.css';
import axios from 'axios';

class login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const params = {
                    account:values.username,
                    pwd:values.pwd,
                    qq:values.qq?values.qq:''
                }
                localStorage.setItem('account',params.account);
                axios.get('/api/v1/dev/login',{params:params}).then(res => {
                    console.log(res);
                    console.log(res.data);
                    if(res.data.code == 1 && res.data.result == true){
                        document.cookie = 'key=login';
                        this.props.callback(true);
                    }
                });
                // console.log('Received values of form: ', values);
            }
        });
    };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div className="login">
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入账号' }],
                })(
                    <Input
                    placeholder="账号"
                    />,
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码' }],
                })(
                    <Input
                    type="password"
                    placeholder="密码"
                    />,
                )}
                </Form.Item>
                <Form.Item>         
                    {getFieldDecorator('qq')(<Input
                        placeholder="QQ号（选填）"
                        />)}
                </Form.Item>
                <Form.Item>            
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                </Button>
                </Form.Item>
            </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(login);
export default WrappedNormalLoginForm;