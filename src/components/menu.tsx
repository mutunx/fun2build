import { Dropdown, Menu, Space, Typography } from 'antd';
import React from 'react';
const menu = (
    <Menu
        selectable
        defaultSelectedKeys={['jandan']}
        items={[
            {
                key: 'jandan',
                type: 'group',
                label: '煎蛋',
                children: [
                    {
                        key:'comments',
                        label: '优评',
                    }
                ]
            },
        ]}
    />
);



function HeaderMenu() {
    return (
        <Dropdown overlay={menu}>
            <Typography.Link>
                <Space>
                    SPACE4FUN
                </Space>
            </Typography.Link>
        </Dropdown>
    );
}

export default HeaderMenu;