/**
 * Created by yanji on 2020/05/28.
 */
import { Table } from 'antd';
import React, { Component } from 'react';
import CustomPagination from '../pagination/Pagination.jsx';

export default class BasicTable extends Component {
    state = {
        clientWidth:-1,
        local: {
            emptyText: '暂无数据'
        },
    }

    componentWillMount() {
        this.setState({
            clientWidth: document.body.clientWidth,
        });
    }

    /**
     * 
     * @changeTable
     * @param p pagination
     * @param f filters
     * @param s sorter
     * @memberof BasicTable
     */
    opChageTable=(p,f,s)=>{
        const { changeTable } = this.props; // 上级目录中传入需要执行的函数
        changeTable(p,f,s)
    }

    render() {
        // 使用案例
        // 参数说明 expandIconColumnIndex,展开按钮的索引
        // 常用属性 rowSelection,根据需要自行加入。
        //const { dataSource, loading=true, columns, expandIconColumnIndex=-1, rowSelection={} } = this.props;
        
        const { 
            rowKey = "id", 
            expandIconColumnIndex = -1, 
            pagination = {
                total: 0
            },
            headerTitle = ''
        } = this.props;
        return (
            <div className="page-layout-content">
                {
                    headerTitle && 
                    <div class="m-table-header">
                      <div class="m-table-header-title">
                        <div class="u-title-text">{headerTitle}</div>
                      </div>
                    </div>
                }
                <Table {...this.props} bordered local={this.state.local} pagination={false} rowKey={rowKey} expandIconColumnIndex={expandIconColumnIndex} />
                {pagination.total > 0 && <CustomPagination {...pagination} change={this.opChageTable} />}
                {
                    this.state.clientWidth < 1920 &&
                    <style>
                        {
                            `.ant-table{
                                font-size:12px !important;
                            }`
                        }
                    </style>
                }
            </div>
        )
    }
}
