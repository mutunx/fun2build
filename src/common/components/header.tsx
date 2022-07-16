import HeaderMenu from "./menu";
import {Flex} from "@chakra-ui/react";
function Header() {
    return (
        <Flex h={'2rem'} w={'100vw'} bg={'blue.900'} color={'blue.50'} flexDir={'row'} justify={'space-between'} align={'center'}>
            <Flex flex={1} justify={'left'}>
                <HeaderMenu />
            </Flex>

            <Flex flex={1} justify={'center'}>
                {/*<HeaderBreadcrumb />*/}
                <span style={{color:"white"}}>主页/煎蛋/优评</span>
            </Flex>

            <Flex flex={1} justify={'right'}>

            </Flex>

        </Flex>
    )
}

export default Header;
