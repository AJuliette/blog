import React from 'react';
import { FaGithub, FaLinkedin, FaCodepen, FaTwitter } from 'react-icons/fa';
import styles from './Contact.module.scss';

const Contact = () => (
  <section className="block">
    <p className="highlight">Contact</p>
    <ul>
      <li className={styles.inline}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/juliette-audema-46270a82/"
        >
          <FaLinkedin size="60" />
        </a>
      </li>
      <li className={styles.inline}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/ajuliette"
        >
          <FaGithub size="60" />
        </a>
      </li>
      <li className={styles.inline}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://codepen.io/AJulietteDev"
        >
          <FaCodepen size="60" />
        </a>
      </li>
      <li className={styles.inline}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/ajuliette_dev"
        >
          <FaTwitter size="60" />
        </a>
      </li>
    </ul>
  </section>
);

export default Contact;
