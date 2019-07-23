import React, { Component } from 'react'
import { Form,Input, Button} from 'antd';
import './index.css';
import axios from 'axios';

let vode = '';

class VCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
        ...this.initState(),
        refresh: false
        }
    }

    initState(){
        return {
        data: this.getRandom(109,48,4),
        rotate: this.getRandom(0,0,4),
        color: [this.getRandom(100,255,3),this.getRandom(100,255,4),this.getRandom(100,255,3),this.getRandom(100,255,3)]
        }
    }

    getRandom(max, min, num) {
        const asciiNum = ~~(Math.random()*(max-min+1)+min)
        if(!Boolean(num)){
        return asciiNum
        }
        const arr = []
        for(let i = 0; i < num; i++){
        arr.push(this.getRandom(max, min))
        }
        return arr
    }

    canvas() {
        const canvas = document.getElementById('bgi')
        let ctx = canvas.getContext('2d')
        canvas.height = canvas.height
        ctx.strokeStyle = `rgb(${this.getRandom(100,10,3).toString()})`
    }
    componentDidMount() {
        this.state.data.map(v=>{
            vode += String.fromCharCode(v > 57 && v < 84 ? v + 7 : (v < 57 ? v : v + 13));
        })
        this.canvas()
    }

    render() {
        const { rotate, color } = this.state
        return (
        <div className='vcodewrap' >
            <canvas id="bgi" width="200" height="200"></canvas>
            {this.state.data.map((v,i) => 
            <div 
                key={i}
                className='itemStr'
                style={{
                transform:`rotate(${rotate[i]}deg)`,
                fontSize: `14px`,
                color: `rgb(${color[i].toString()})`,
                //   color:'#333',
                lineHeight:'30px'
                }}
                onMouseEnter={() => this.setState({refresh:true})}
            >
                {String.fromCharCode(v > 57 && v < 84 ? v + 7 : ( v < 57 ? v : v + 13 ))}
            </div>  
            )}
        {
            this.state.refresh
            ? <div 
                className='mask'
                onClick={() => {
                this.setState({...this.initState(),refresh: false})
                this.canvas()
                }}
                onMouseLeave={() => {this.setState({refresh: false})}}
            >
            </div> 
            : null}
        </div>
        )
    }
}

class login extends Component {
    constructor(){
        super();
        this.state = {
            letcode:vode
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const params = {
                    account:values.username,
                    pwd:values.password,
                    qq:values.qq?values.qq:''
                }
                localStorage.setItem('account',params.account);
                axios.get('/api/v1/dev/login', {
                        params: params
                }).then(res => {
                    if(res.data.code == 1 && res.data.result == true){
                        this.props.callback(true);
                    }
                });
                // console.log('Received values of form: ', values);
            }
        });
    };

    componentDidMount = ()=>{
        this.setState({
            letcode:vode
        })
    }

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
                    {getFieldDecorator('vcode', {
                            rules: [{ required: true, message: '请输入验证码' },{pattern: new RegExp('^' + this.state.letcode + '$', 'gim'), message: '请输入正确的验证码'}],
                        })(
                            <span>
                                <Input placeholder="请输入验证码" className="vcode" type="vcode"/>
                                <VCode/>
                            </span>
                        )} 
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