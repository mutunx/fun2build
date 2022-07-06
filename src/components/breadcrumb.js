import React from 'react';
import {Breadcrumb} from "antd";

function HeaderBreadcrumb(props) {
    return (
        <Breadcrumb >
            <Breadcrumb.Item><a style={{color:'white'}}>主页</a></Breadcrumb.Item>
            <Breadcrumb.Item><a style={{color:'white'}}>煎蛋</a></Breadcrumb.Item>
            <Breadcrumb.Item><a style={{color:'white'}}>优评</a></Breadcrumb.Item>
        </Breadcrumb>
    );
}

export default HeaderBreadcrumb;