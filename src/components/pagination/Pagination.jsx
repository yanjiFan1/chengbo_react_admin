import { Pagination,Input } from 'antd';
import React, { Component } from 'react';

export default class CustomPagination extends Component {
    constructor(props){
        super(props)

        this.state = {
            current: props.current || 1,
            pageSize: props.pageSize || 10,
            total: props.total || 0,
            showSizeChanger: props.showSizeChanger
        }
    }


    componentWillReceiveProps(nextProps){
        if(nextProps.total!=this.state.total){
            this.setState({
                current: nextProps.current || 1,
                pageSize: nextProps.pageSize || 10,
                total: nextProps.total || 0
            })
        }
    }
  
    onChange = (current,pageSize) => {
        this.setState({
            current: current,
            pageSize:pageSize
        });
        this.props.change({pageSize:pageSize,current:current});
    }

    enter = (e) => {
        if (e.key === 'Enter') {
            this.turnPage(e);
        }
    }

    blur = (e) => {
        this.turnPage(e);
    } 

    // 页面跳转
    turnPage = (e) => {
        const current = parseInt(e.target.value, 10);
        let maxPage = Math.ceil(this.props.total/this.state.pageSize);

        if (isNaN(current) || this.state.current === current) return;
      
        this.setState({ current: current > maxPage ? maxPage : (current < 1 ? 1 : current) });
        this.props.change({pageSize:this.state.pageSize,current:current});
    }

    render() {
        return ( 
            <div className="f-fr" style={{marginTop:'16px'}}>
            <Pagination
                current={this.state.current}
                pageSize={this.state.pageSize}
                pageSizeOptions ={['10', '20', '50', '100']}
                onChange={this.onChange}
                showTotal={(total)=>
                    `共 ${total} 条数据`
                }
                onShowSizeChange={this.onChange}
                showSizeChanger={this.state.showSizeChanger}
                total ={this.state.total}
                style={{ display: 'inline-block', verticalAlign: 'top', marginRight: 8 }}
            />
                跳转到第 <Input style={{ width: 60 }} placeholder="" onKeyDown={this.enter} onBlur={this.blur} /> 页
            </div>
        );
    }
  }