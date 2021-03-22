import React, { ReactNode, useContext } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { fr } from 'date-fns/locale';
import LayoutContext from '../contexts/LayoutContext';
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
        <h1 className={styles.title}>{title}</h1>
        <section className={styles.articleInfos}>
          <em className={styles.articleInfo}>
            Temps de lecture:{' '}
            <span className={styles.highlight}>{timeToRead} minutes</span>
          </em>
          <em className={styles.articleInfo}>
            Il y a:{' '}
            <span className={styles.highlight}>
              {formatDistanceToNow(new Date(date), { locale: fr })}
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
