/**
 * Created by yanji on 2020/05/28.
 */
import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

class BreadcrumbCustom extends React.Component {
    render() {
        const first = <Breadcrumb.Item>{this.props.first}</Breadcrumb.Item> || '';
        const second = <Breadcrumb.Item>{this.props.second}</Breadcrumb.Item> || '';
        const third = <Breadcrumb.Item>{this.props.third}</Breadcrumb.Item> || '';
        const four = <Breadcrumb.Item>{this.props.four}</Breadcrumb.Item> || '';
        const textDescription = this.props.textDescription || '';
        return (
            <div style={{position:'relative'}}>
                <Breadcrumb style={{ margin: '12px 0' }} separator=">">
                    <Breadcrumb.Item><Link to={'/'}>首页</Link></Breadcrumb.Item>
                        {first}
                        {second}
                        {third}
                        {four}
                </Breadcrumb>
                <span style={{position:'absolute',right:0,top:0}}>{textDescription}</span>   

                <style>
                    {`.ant-breadcrumb>span:last-child{
                        font-weight:600;
                    }`}    
                </style> 
            </div>
        )
    }
}

export default BreadcrumbCustom;