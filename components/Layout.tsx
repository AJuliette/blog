import React, { ReactNode, useContext } from 'react';
import LayoutContext from '../contexts/LayoutContext';
import Header from './Header';

import styles from './Layout.module.scss';

const Layout = ({ children }: { children: ReactNode }) => {
  const { isProfileOpen } = useContext(LayoutContext);

  return (
    <>
      <Header />
      <div className={styles.mainWrapper}>
        <main
          className={[styles.main, isProfileOpen ? 'profile-open' : ''].join(
            ' '
          )}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
