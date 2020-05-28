import React, { Component } from 'react';
import { Pagination,Input } from 'antd';
import { connect } from 'react-redux';

class CustomPagination extends Component {

    onChange = (currentPage,pageSize) => {
		const { change } = this.props;
        change && change({pageSize, currentPage});
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
		const { total, pageSize, currentPage, change } = this.props;
        const currPage = parseInt(e.target.value, 10);
        let maxPage = Math.ceil(total / pageSize);

		if (isNaN(currPage) || currPage === currentPage) return;

        change && change({currentPage: currPage > maxPage ? maxPage : (currPage < 1 ? 1 : currPage), pageSize});
    }

    render() {
		const { currentPage, pageSize, total, showSizeChanger = true, ...rest } = this.props;
        return (
            <div className="fr" style={{marginTop:'16px'}}>
            <Pagination
				{...rest}
                current={currentPage}
                pageSize={pageSize}
                onChange={this.onChange}
                showTotal={(total)=>
                    `共 ${total} 条数据`
                }
                pageSizeOptions ={['10', '20', '50', '100']}
                onShowSizeChange={this.onChange}
                showSizeChanger={showSizeChanger}
                total ={total}
                style={{ display: 'inline-block', verticalAlign: 'top', marginRight: 8 }}
            />
                跳转到第 <Input style={{ width: 60 }} placeholder="" onKeyDown={this.enter} onBlur={this.blur} type="number" /> 页
            </div>
        );
    }
  }

const mapStateToProps = state => ({ ...state.global.pagination });

export default connect(mapStateToProps)(CustomPagination);
