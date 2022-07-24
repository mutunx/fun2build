import {Flex} from "@chakra-ui/react";
import { Link} from "react-router-dom";
import {useState} from "react";
function Header() {

    const [active,setActive] = useState('comment');


    return (
        <Flex h={'100vh'} w={'20rem'} bg={'white'} color={'blackAlpha.300'} flexDir={'column'} justify={'space-between'} align={'center'}>
            <Flex h={'7rem'} w={'100%'} fontSize={'4rem'} textShadow={'0px 0px 20px #e7e7e7'} fontWeight={500} letterSpacing={'-0.3rem'} style={{fontVariant:'diagonal-fractions'}} justify={'left'}>
                SPACE4FUN
            </Flex>

            <Flex flex={1} w={'100%'} fontSize={'3rem'} paddingRight={'1rem'} alignItems={'end'} justify={'start'} flexDir={'column'}>
                <Link to="/" onClick={() => setActive('comment')}>{active === 'comment' ? '>': ''} 优评</Link>
                {/*<Link to="/test" onClick={() => setActive('test')}>{active === 'test' ? '>': ''} Expenses</Link>*/}
            </Flex>

            <Flex flex={1} justify={'right'}>

            </Flex>


        </Flex>
    )
}

export default Header;
