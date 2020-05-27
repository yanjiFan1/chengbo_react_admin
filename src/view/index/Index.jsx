import React, {Component} from 'react'
import {Spin} from 'antd';
import { connect } from 'react-redux';

class Index extends Component {
    componentDidMount(){
        // const{ user ={},history} = this.props;
        // let menuList = user.menusList;
        // let len = menuList.length;
        // for(var i=0;i<len;i++){
        //     if(menuList[i].fronType==='route'){
        //         if(menuList[i].sub&&menuList[i].sub.length>0){
        //             history.push(menuList[i].sub[0].frontLink);
        //         }else{
        //             history.push(menuList[i].frontLink);
        //         }
        //         break
        //     }
        // }
    }
    render() {
        return (
            <div className="gutter-ats">
                <Spin tip="载入中..."></Spin>
                我是首页哦
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
