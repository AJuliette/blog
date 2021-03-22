import React, { ReactNode, useContext } from 'react';
import Header from './Header';

import styles from './Layout.module.scss';

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    <div className={styles.mainWrapper}>
      <main className={styles.main}>{children}</main>
    </div>
  </>
);

export default Layout;
