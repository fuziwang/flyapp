import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;
export default class nav extends Component {
    render() {
        return (
            <Sider width={200} style={{ background: '#fff',margin:20 }}>
                <Menu 
                    mode="inline"
                    defaultSelectedKeys={['1']}
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
                        <Menu.Item key="1">APP</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}
