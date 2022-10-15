import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';


export default function Layout({ children }) {
    return (
        <div className={styles.container}>
            <header>
                <Link href={'/discuss'}>讨论</Link>
            </header>
            <main>{children}</main>
            <div className={styles.followsBar}>
                <Link href={'/discuss/jandan'}>煎蛋热评</Link>
                <Link href={'/discuss/v2ex'}>v2ex热榜</Link>
            </div>
        </div>
    );
}
