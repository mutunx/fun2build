import {Flex} from "@chakra-ui/react";
import { Link} from "react-router-dom";
import {useState} from "react";
function Header() {

    const [active,setActive] = useState('comment');


    return (
        <Flex h={'100vh'} w={'10rem'} bg={'white'} color={'blackAlpha.300'} flexDir={'column'} justify={'space-between'} align={'center'}>
            <Flex justify={'space-around'}  h={'6rem'} w={'100%'} fontSize={'4rem'} textShadow={'0px 0px 20px #e7e7e7'} fontWeight={500} letterSpacing={'-0.3rem'} style={{fontVariant:'diagonal-fractions'}} >
                S4F
            </Flex>

            <Flex flex={1} w={'100%'} fontSize={'1.5rem'} paddingRight={'1rem'} alignItems={'end'} justify={'start'} flexDir={'column'}>
                <Link to="/" onClick={() => setActive('comment')}>{active === 'comment' ? '>': ''} 煎蛋优评</Link>
                <Link to="/v2ex/hot" onClick={() => setActive('v2exHot')}>{active === 'v2exHot' ? '>': ''} v2ex热榜</Link>
            </Flex>

            <Flex flex={1} justify={'right'}>

            </Flex>


        </Flex>
    )
}

export default Header;
