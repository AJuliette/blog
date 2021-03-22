import React, { useContext } from 'react';
import { FaEnvelope, FaGithub, FaTwitter, FaMugHot } from 'react-icons/fa';
import Image from 'next/image';

import { ImTextWidth } from 'react-icons/im';
import styles from './Welcome.module.scss';
import PreferencesContext from '../contexts/PreferencesContext';
import Slider from './Slider';
import { useScroll } from '../hooks/useScroll';

const ImgProfilePic = () => (
  <div className={styles.pictureContainer}>
    <Image src="/profile.jpeg" width="200" height="200" />
  </div>
);

const Welcome = () => {
  const { wideCodeBlock, toggleWideCodeBlocks } = useContext(
    PreferencesContext
  );
  const { atTopScroll, scrollingUp } = useScroll();

  return (
    <div>
      <ImgProfilePic />
      <header>
        <h1>Welcome !</h1>
        <h3>Les élucubrations d'un développeur fatigué</h3>
        <p>
          Développeur, ludiste, admin sys, grimpeur et cuisinier à mes heures.
          Je suis curieux de tout, tout le temps. J’aime découvrir de nouvelles
          choses et les partager.
        </p>
      </header>
      <section>
        <h2>Me contacter</h2>
        <ul>
          <li>
            <FaEnvelope />
            <span className={styles.space} />
            <a
              href="mailto:zaratan@hey.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              zaratan@hey.com
            </a>
          </li>
          <li>
            <FaGithub />
            <span className={styles.space} />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/zaratan"
            >
              zaratan
            </a>
          </li>
          <li>
            <FaTwitter />
            <span className={styles.space} />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/zaratan"
            >
              @zaratan
            </a>
          </li>
        </ul>
      </section>
      <section>
        <h2>Me soutenir</h2>
        <ul>
          <li>
            <FaMugHot />
            <span className={styles.space} />
            <a
              href="https://ko-fi.com/zaratan"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ko-Fi
            </a>
          </li>
        </ul>
      </section>
      <section>
        <h2>Options</h2>
        <ul>
          <li>
            <ImTextWidth />
            <span className={styles.space} />
            <span>
              Blocs de code larges :{' '}
              <Slider active={wideCodeBlock} action={toggleWideCodeBlocks} />
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Welcome;
