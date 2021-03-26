import React from 'react';
import Image from 'next/image';

import styles from './Welcome.module.scss';

const ImgProfilePic = () => (
  <div className={styles.pictureContainer}>
    <Image src="/profile.jpeg" width="200" height="200" />
  </div>
);

const Welcome = () => (
  <section className={styles.profileContainer}>
    <ImgProfilePic />
    <header className={styles.header}>
      <p className={styles.title}>Hi, I'm Juliette</p>
      <p className={styles.subtitle}>Thanks for stopping by !</p>
      <p>
        I'm a back-end Ruby on Rails developer. I'm curious about a lot of
        things in web development. I love knitting and embroidery. Here to share
        my journey.
      </p>
    </header>
  </section>
);

export default Welcome;
