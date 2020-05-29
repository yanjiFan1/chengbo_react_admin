import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Card, Drawer, Button, Modal } from 'antd';
import BreadcrumbCustom from '@/components/common/breadcrumb/Breadcrumb'
import BasicTable from '@/components/table/Table';
// import RoleList from './RoleList'
// import RolePannel from './RolePannel';
// const { getAuthRoleList,addRole,deleteRole,editRolePanel,getAllMenu,getRoleMenu} = authAc

 class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: false  //查看状态
        }
    }

    state = {
    	list: '',
    	params: {
    		total: 11
    	},
    	columns: [
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
    	]
    }

    onSave = (payload) => {
        // this.props.addRole( payload, this.onClose )  // 新增模式
    }

    // 关闭抽屉
    onClose = () => {
        this.setState({
            status: false,
        });
    }

    // 编辑角色
    onEditRole =(payload)=>{
        this.onOpen()
        // this.props.editRolePanel(payload); // 唤起弹窗
    }

    // 新增
    onAddRole =()=>{
        //成功回调 
        this.onOpen()
        // this.props.editRolePanel(); // 唤起弹窗
    }

    onOpen =() =>{
        this.setState({
            status: true,
        });
    }

    // 删除操作成功
    onOk =(id)=>{
        // this.props.deleteRole(id);
    }

    // 删除角色
    onDeleteRole =(id)=>{
        //成功回调 
        Modal.confirm({
            title: '确定删除角色吗？',
            content: '角色删除后无法恢复哦~',
            okText: '确认',
            cancelText: '取消',
            onOk:()=>this.onOk(id)
        });
    }

    //表格查询操作
    changeTable=(p,f,s)=>{
        p.queryStr = this.props.queryStr;
        this.getHomeList()
    }

    componentDidMount() {
        // if(this.props.roleList.length === 0){
        //     // this.props.getAuthRoleList();
        //     // this.props.getAllMenu();     // 获取所有权限列表
        // }
    }

    render() {
        const { list=[], params } = this.state;
        return (
            <div className="g-auth-role">
                <BreadcrumbCustom first="权限管理" second="角色管理"/>
                <BasicTable pagination={params} headerTitle="角色管理" dataSource={list} columns={this.columns} rowKey="id" changeTable={this.changeTable  } style={{ tableLayout:'fixed'}}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        
    
    }
};

const mapDispatchToProps = dispatch => ({
    
});

export default connect(mapStateToProps,mapDispatchToProps)(Index);