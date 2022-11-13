import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { Flex } from '@chakra-ui/react';


export default function Layout({ children }) {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                {/* <Link href={'/discuss'}>议</Link>
                <Link href={'/discuss'}>文</Link>
                <Link href={'/discuss'}>图</Link>
                <Link href={'/discuss'}>影</Link> */}
            </header>
            <main style={{flex:6}}>{children}</main>
            <Flex className={styles.followsBar}>
                <Link href={'/discuss/jandan'}>煎蛋</Link>
                <Link href={'/discuss/v2ex'}>v2ex</Link>
            </Flex>
        </div>
    );
}
