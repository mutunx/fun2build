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
    console.log(current==='discuss');
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href={'/discuss'}>
                    <a className={current==='discuss' ? styles.active:''}>议</a>
                </Link>
                {/* <Link href={'/discuss'}>文</Link> */}
                <Link href={'/picture'}>
                    <a className={current==='picture' ? styles.active:''}>图</a>
                </Link>
                {/* <Link href={'/discuss'}>影</Link> */}
            </header>
            <main style={{flex:6}}>{children}</main>
            <Flex className={styles.followsBar}>
                {current && source[current]}
            </Flex>
        </div>
    );
}
