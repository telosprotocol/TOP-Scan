import type { NextPage } from 'next'
import React from 'react'
import styles from '../styles/Layout.module.scss'
import Footer from './Footer'
import Header from './Header'

type CProps = {
  children: React.ReactNode;
};

const Layout: NextPage<CProps> = ({ children }) => {
  return <div className={styles.layout}>
    <Header></Header>
    <div className={styles.content}>
      {children}
    </div>
    <Footer></Footer>
  </div>
}

export default Layout
