import {Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Text} from "@chakra-ui/react";


function HeaderMenu() {
    return (
        <Menu>
            <MenuButton >
                SPACE4FUN
            </MenuButton>
            <MenuList color={'blue.900'}>
                <MenuItem>总览</MenuItem>
                <MenuDivider />
                <MenuGroup title={'煎蛋'}>
                    <MenuItem>热评</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    );
}

export default HeaderMenu;
