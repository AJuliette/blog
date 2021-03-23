import React, { ReactNode, useContext } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { fr } from 'date-fns/locale';
import styles from './Article.module.scss';
import PreferencesContext from '../contexts/PreferencesContext';
import classCompactor from '../helpers/classCompator';

const Article = ({
  children,
  timeToRead,
  title,
  date,
  emoji,
}: {
  children: ReactNode;
  timeToRead: number;
  title: string;
  date: Date;
  emoji: string;
}) => {
  const { wideCodeBlock } = useContext(PreferencesContext);
  const wideCodeBlockClass = wideCodeBlock ? 'wide-code-block' : '';
  return (
    <>
      <header className={styles.articleHeader}>
        <div className={styles.cell}>
          <div className={styles.text}>{emoji}</div>
          <div className={styles.blur}>{emoji}</div>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <section className={styles.articleInfos}>
          <em className={styles.articleInfo}>
            Reading time:{' '}
            <span className={styles.highlight}>{timeToRead} minutes</span>
          </em>
          <em className={styles.articleInfo}>
            Posted:{' '}
            <span className={styles.highlight}>
              {formatDistanceToNow(new Date(date))} ago
            </span>
          </em>
        </section>
      </header>
      <article
        className={classCompactor([
          styles.articleContainer,
          wideCodeBlockClass,
          'line-numbers',
        ])}
      >
        {children}
      </article>
    </>
  );
};

export default Article;
