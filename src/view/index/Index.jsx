import React, {Component} from 'react'
import { Spin } from 'antd';
import { connect } from 'react-redux';
import BasicTable from '@/components/table/Table';
import Utils from '@/utils/index'
import Breadcrumb from '@/components/common/breadcrumb/Breadcrumb';
import http from '@/axios/home'

class Index extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
                key: 'name',
                width: 200,
                render: text => <span className="f-fwb" title={text} >{text}</span>
            }, {
                title: '人数',
                dataIndex: 'userCount',
                key: 'userCount',
                width: 100,
                render: text => <em className="f-fwb">{Utils.toThousands(text||0)}</em>
            }, {
                title: '描述',
                key: 'remark',
                dataIndex: 'remark',
                width: 600,
                render: text => <span title={text} className="f-toe">{text||'--'}</span>
            }, {
                title: '更新时间',
                key: 'updateTime',
                dataIndex: 'updateTime',
                width: 100
            }, {
                title: '操作',
                key: 'action',
                width: 100,
                render: (text, record) => (
                    <span>
                        {<a onClick={()=>this.onEdit(record)} style={{marginRight:'16px'}}>编辑</a>}
                        {record.userCount==0 && <a onClick={()=>this.onDelete(record.id)}>删除</a>}
                    </span>
                )
            }
        ];
    }
    state = {
        list: [{
            name: '111111111111',
            updateTime: '2020/05/28',
            remark: '3333333333'
        },{
            name: '111111111111',
            updateTime: '2020/05/28',
            remark: '3333333333'
        },{
            name: '111111111111',
            updateTime: '2020/05/28',
            remark: '3333333333',
        },{
            name: '111111111111',
            updateTime: '2020/05/28',
            remark: '3333333333',
        },{
            name: '111111111111',
            updateTime: '2020/05/28',
            remark: '3333333333',
        },{
            name: '111111111111',
            updateTime: '2020/05/28',
            remark: '3333333333',
        },{
            name: '111111111111',
            updateTime: '2020/05/28',
            remark: '3333333333',
        },{
            name: '111111111111',
            updateTime: '2020/05/28',
            remark: '3333333333',
        },{
            name: '111111111111',
            updateTime: '2020/05/28',
            remark: '3333333333',
        }],
        params: {
            currentPage: 1,
            size: 10,
            total: 30
        }
    }
    componentDidMount(){
        this.getHomeList()
    }

    // 获取列表数据
    getHomeList() {
        http.getHomeList().then(res => {
            const data = res && res.data
            let params = {
                total: data && data.total
            }
            this.setState({
                list: data && data.list,
                params
            })
        })
    }

    //表格查询操作
    changeTable=(p,f,s)=>{
        p.queryStr = this.props.queryStr;
        this.getHomeList()
    }

    render() {
        const { list=[], params } = this.state;
        return (
            <div className="gutter-ats">
                <Breadcrumb first="首页" secord="aaa" />
                <BasicTable pagination={params} headerTitle="我是首页" dataSource={list} columns={this.columns} rowKey="id" changeTable={this.changeTable  } style={{ tableLayout:'fixed'}}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { user = {}, } = state;
    return { user};
};

const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
