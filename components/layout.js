import styles from './layout.module.css';
import Link from 'next/link';
import { Flex } from '@chakra-ui/react';


const source = {
    'discuss':[
        <Link href={'/discuss/jandan'}>煎蛋</Link>,
        <Link href={'/discuss/v2ex'}>v2ex</Link>
    ],
    'picture':[
        <Link href={'/picture/jandan'}>煎蛋</Link>,
    ],
}

export default function Layout({ children,current }) {

    console.log(current);
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href={'/discuss'}>议</Link>
                {/* <Link href={'/discuss'}>文</Link> */}
                <Link href={'/picture'}>图</Link>
                {/* <Link href={'/discuss'}>影</Link> */}
            </header>
            <main style={{flex:6}}>{children}</main>
            <Flex className={styles.followsBar}>
                {current && source[current]}
            </Flex>
        </div>
    );
}
