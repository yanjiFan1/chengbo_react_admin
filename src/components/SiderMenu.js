import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const iconStyle={
    marginRight:'10px',
    fontSize:'12px'
}

const renderMenuItem =
    ({ id, name, frontIcon, fronType, frontLink,...props })=> {
        return (
            <Menu.Item
                key={frontLink}
                {...props}
            >
                <Link to={frontLink}>
                    {frontIcon && <i className={`icon iconfont ${frontIcon.indexOf('icon')>-1?frontIcon:'icon-'+frontIcon}` } style={iconStyle} />}
                    <span className="nav-text f-usn" >{name}</span>
                </Link>
            </Menu.Item>
        )
    }

const renderSubMenu =
    ({ id, name, frontIcon, fronType,frontLink, sub, ...props }) => {
        return (
            <Menu.SubMenu
                key={frontLink}
                title={
                    <span>
                        {frontIcon && <i className={`icon iconfont ${frontIcon.indexOf('icon')>-1?frontIcon:'icon-'+frontIcon}` } style={iconStyle} />}
                        <span className="nav-text f-usn">{name}</span>
                    </span>
                }
                {...props}
            >
                {sub && sub.map(item => renderMenuItem(item))}
            </Menu.SubMenu>
        )
    }

export default ({ menus, ...props }) => {
    return (
        <Menu {...props} style={{marginBottom:'48px'}}>
            {menus && menus
            .filter(item=>item.fronType !== 'module')
            .map(item => item.sub && item.sub.length ? renderSubMenu(item) : renderMenuItem(item))}
        </Menu>
    )
}
