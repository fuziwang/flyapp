import React, { Component } from 'react'
import { Layout, Menu} from 'antd';
import { Link} from 'react-router-dom';

const { SubMenu } = Menu;
const { Sider } = Layout;
export default class nav extends Component {
    render() {
        // console.log(window.location.hash);
        return (
            <Sider width={200} style={{ background: '#fff',margin:15, }}>
                <Menu 
                    mode="inline"
                    defaultSelectedKeys={[window.location.hash]}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}>
                    <SubMenu
                        key="sub1"
                        title={
                        <span>
                            <i className="iconfont icon-wenjian" style={{marginRight:'10px'}}/>
                            APP管理
                        </span>
                        }
                    >
                        <Menu.Item key="#/"><Link to="/">APP</Link></Menu.Item>
                        <Menu.Item key="#/download"><Link to="/download">下载管理</Link></Menu.Item>
                        <Menu.Item key="#/text"><Link to="/text">充值</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}
