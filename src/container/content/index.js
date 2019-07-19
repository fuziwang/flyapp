import React, { Component } from 'react';
import { Upload,Modal,Layout,Breadcrumb,Table,Button} from 'antd';
import axios from 'axios';

const { Content} = Layout;
const { confirm } = Modal;
let data = [
  {
    'key':1,
    'amount': 10000,
    'bundle_id': 'com.superfate.superfate',
    'app_name': '测试APP',
    'icon': '/public/icon/jdiay.plist',
    'version': '1.0.1',
    'up_date': '2018-09-12 12:00:00',
    'url': 'https://www1.iosflygo.com:9091/api/v1/user/plist?'
  },
  {
    'key': 2,
    'amount': 10000,
    'bundle_id': 'com.superfate.superfate',
    'app_name': '测试APP',
    'icon': '/public/icon/jdiay.plist',
    'version': '1.0.1',
    'up_date': '2018-09-12 12:00:00',
    'url': 'https://www1.iosflygo.com:9091/api/v1/user/plist?'
  },
  {
    'key': 3,
    'amount': 10000,
    'bundle_id': 'com.superfate.superfate',
    'app_name': '测试APP',
    'icon': '/public/icon/jdiay.plist',
    'version': '1.0.1',
    'up_date': '2018-09-12 12:00:00',
    'url': 'https://www1.iosflygo.com:9091/api/v1/user/plist?'
  },
  {
    'key': 4,
    'amount': 10000,
    'bundle_id': 'com.superfate.superfate',
    'app_name': '测试APP',
    'icon': '/public/icon/jdiay.plist',
    'version': '1.0.1',
    'up_date': '2018-09-12 12:00:00',
    'url': 'https://www1.iosflygo.com:9091/api/v1/user/plist?'
  },
  {
    'key': 5,
    'amount': 10000,
    'bundle_id': 'com.superfate.superfate',
    'app_name': '测试APP',
    'icon': '/public/icon/jdiay.plist',
    'version': '1.0.1',
    'up_date': '2018-09-12 12:00:00',
    'url': 'https://www1.iosflygo.com:9091/api/v1/user/plist?'
  },
  {
    'key': 6,
    'amount': 10000,
    'bundle_id': 'com.superfate.superfate',
    'app_name': '测试APP',
    'icon': '/public/icon/jdiay.plist',
    'version': '1.0.1',
    'up_date': '2018-09-12 12:00:00',
    'url': 'https://www1.iosflygo.com:9091/api/v1/user/plist?'
  },
  {
    'key': 7,
    'amount': 10000,
    'bundle_id': 'com.superfate.superfate',
    'app_name': '测试APP',
    'icon': '/public/icon/jdiay.plist',
    'version': '1.0.1',
    'up_date': '2018-09-12 12:00:00',
    'url': 'https://www1.iosflygo.com:9091/api/v1/user/plist?'
  }
];

function showDeleteConfirm(record) {
  confirm({
    title: '确定要删除该记录吗',
    okText: '确认',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      console.log(record)
      const params = {
        account:localStorage.getItem('account'),
        app_id:''
      }
      axios.post('/api/v1/dev/app/del',params).then(res=>{
        console.log(res.data);
        if(res.data.code == 1 && res.data.result == true){
          data.splice(record.key-1, 1);
        }
      });
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}
export default class content extends Component {
    constructor(){
      super();
      this.state = {
        current:1
      }
      this.columns = [
          {
            title: '',
            dataIndex: 'icon',
            key: 'icon',
            render: text=>({text})
          },
          {
            title: 'App名称',
            dataIndex: 'app_name',
            key: 'app_name',
          },
          {
            title: 'Bundle_ID',
            dataIndex: 'bundle_id',
            key: 'bundle_id',
          },
          {
            title: '版本号',
            dataIndex: 'version',
            key: 'version',
          },
          {
            title: '安装总数',
            dataIndex: 'amount',
            key: 'amount',
          },
          {
            title: '下载链接',
            dataIndex: 'url',
            key: 'url',
          },
          {
            title: '上传时间',
            dataIndex: 'up_date',
            key: 'up_date',
          },
          {
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <span>
                <a href="javascript:;" onClick={()=>this.handleClick(record)}>删除</a>
              </span>
            ),
          },
        ];
    }

    handleClick = (record)=>{
      showDeleteConfirm(record);
    }
    componentDidMount = ()=>{
      const params = {
        account:localStorage.getItem('account'),
        page_num:this.state.current
      }
      axios.get('/api/v1/dev/app/list',{params:params}).then(res=>{
          console.log(res.data);
          for(var i = 0;i<res.data.length;i++){
            data[i].key = i+1;
            data[i].amount = res.data[i].amount;
            data[i].bundle_id = res.data[i].bundle_id;
            data[i].app_name = res.data[i].app_name;
            data[i].version = res.data[i].version;
            data[i].icon = res.data[i].icon;
            data[i].url = res.data[i].url;
            data[i].up_date = res.data[i].up_date;
          }
      });
    }
    handleUpload = ()=>{
      
    }
    render() {
        return (
            <Layout style={{ padding: '0' }}>
                <Content
                style={{
                    background: '#fff',
                    padding: 24,
                    margin: 20,
                    minHeight: 450,
                }}>
                    <Breadcrumb>
                        <Breadcrumb.Item>App管理</Breadcrumb.Item>
                        <Breadcrumb.Item style={{color:'#333'}}>App列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <Upload style={{float:'right',marginTop:'15px'}} >
                      <Button type = "primary" onClick={this.handleUpload}> 上传 </Button>
                    </Upload>
                    <Table 
                      columns={this.columns}
                      dataSource={data}
                      style={{clear:'both',paddingTop:'15px'}}
                      pagination={{
                        pageSize:5,
                        total: data.length,
                        current:　this.state.current,
                        onChange: (page, pageSize) => {
                            console.log('current page: ', page)
                            this.setState({
                                current: page
                            });
                            const params = {
                              account:localStorage.getItem('account'),
                              page_num:this.state.current
                            }
                            axios.get('/api/v1/dev/app/list',{params:params}).then(res=>{
                                console.log(res.data);
                                for(var i = 0;i<res.data.length;i++){
                                  data[i].key = i+1;
                                  data[i].amount = res.data[i].amount;
                                  data[i].bundle_id = res.data[i].bundle_id;
                                  data[i].app_name = res.data[i].app_name;
                                  data[i].version = res.data[i].version;
                                  data[i].icon = res.data[i].icon;
                                  data[i].url = res.data[i].url;
                                  data[i].up_date = res.data[i].up_date;
                                }
                            });
                        }
                      }}
                    />
                </Content>
            </Layout>
        )
    }
}
