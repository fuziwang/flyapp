import React, { Component } from 'react';
import { Upload,Modal,Layout,Breadcrumb,Table,Button,message} from 'antd';
import axios from 'axios';
import './index.css';

const { Content} = Layout;
const { confirm } = Modal;

export default class Home extends Component {
    constructor(){
      super();
      this.state = {
        current:1,
        data:[],
        length:0
      }
      this.prop = {
        name: 'app_file',
        action: '/api/v1/dev/upload/ipa',
        data: {
          account: localStorage.getItem('account')
        },
        headers: {
          authorization: 'authorization-text',
        },
        showUploadList: true
      };
      this.columns = [
          {
            title: '',
            dataIndex: 'icon',
            key: 'icon',
            width:80,
            render: text=>{
              return <img src={"https://www1.iosflygo.com:9091/api/" + text}></img>
            }
          },
          {
            title: 'App名称',
            dataIndex: 'app_name',
            key: 'app_name',
            width:100
          },
          {
            title: 'Bundle_ID',
            dataIndex: 'bundle_id',
            key: 'bundle_id',
            width: 120,
            render:(text,record) =>{
              var result = text.replace(/(.{15})/g, '$1\n');
              return <span>{result}</span>
            }
          },
          {
            title: '版本号',
            dataIndex: 'version',
            key: 'version',
            width: 80
          },
          {
            title: '安装总数',
            dataIndex: 'amount',
            key: 'amount',
            width: 100
          },
          {
            title: '下载链接',
            dataIndex: 'url',
            key: 'url',
            render:(text,record) =>{
              // var result = text.replace(/(.{40})/g, '$1\n');
              return <span style={{wordBreak:'break-all'}}>{text}</span>
            }
          },
          {
            title: '上传时间',
            dataIndex: 'up_date',
            key: 'up_date',
            width: 110,
            render:(text,record) =>{
              var result = text.replace(/(.{10})/g, '$1\n');
              return <span>{result}</span>
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 60,
            render: (text, record) => (
              <span>
                <a href="javascript:;" onClick={()=>this.handleClick(record)}>删除</a>
              </span>
            ),
          },
        ];
    }

    handleClick = (record)=>{
      var that = this;
      confirm({
        title: '确定要删除该记录吗',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          const params = {
            account: localStorage.getItem('account'),
            app_id: record.app_id
          }
          axios.post('/api/v1/dev/app/del', params).then(res => {
            if (res.data.code == 1 && res.data.result == true) {
              var list = [...that.state.data];
              list.splice(record.key-1, 1);
              that.setState({
                data:list
              })
            }
          });
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    }

    handleChange = (info)=>{
      // console.log(info);
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`文件上传成功`);
        const params = {
          account: localStorage.getItem('account'),
          page_num: this.state.current
        }
        axios.get('/api/v1/dev/app/list', {
          params: params
        }).then(res => {
          var list = [...res.data];
          for (var i = 0; i < res.data.length; i++) {
            list[i]['key'] = i + 1;
          }
          this.setState({
            data: res.data,
            length: res.data.length == 0 ? 0 : res.data[0].page_cnt
          });
        });
      } else if (info.file.status === 'error') {
        message.error(`文件上传失败`);
      }
    }
    componentDidMount = ()=>{
      const params = {
        account:localStorage.getItem('account'),
        page_num:this.state.current
      }
      axios.get('/api/v1/dev/app/list', {
          params: params
      }).then(res => {
        var list = [...res.data];
        for(var i = 0;i<res.data.length;i++){
          list[i]['key'] = i+1;
        }
        this.setState({
          data:res.data,
          length: res.data.length == 0?0:res.data[0].page_cnt
        });
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
                        <Breadcrumb.Item style={{color:'#333'}}>App列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <Upload style={{display:'block',marginTop:'10px'}} {...this.prop} onChange={this.handleChange}>
                      <Button type = "primary"> 上传 </Button>
                    </Upload>
                    <Table
                      columns={this.columns}
                      dataSource={this.state.data}
                      style={{clear:'both',paddingTop:'15px'}}
                      scroll={{ y: document.body.scrollHeight - 330 }}
                      pagination={{
                        pageSize:20,
                        total: this.state.length,
                        onChange: (page, pageSize) => {
                            this.setState({
                                current: page
                            });
                            const params = {
                              account:localStorage.getItem('account'),
                              page_num:page
                            }
                            axios.get('/api/v1/dev/app/list', {params: params}).then(res => {
                              var list = [...res.data];
                              for (var i = 0; i < res.data.length; i++) {
                                list[i]['key'] = i + 1;
                              }
                              this.setState({
                                data:res.data
                              });
                            });
                        }
                      }}
                    />
                </Content>
            </Layout>
        )
    }
}
