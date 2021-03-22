import Link from 'next/link';
import React, { useContext } from 'react';
import LayoutContext from '../contexts/LayoutContext';
import useWatchFont from '../hooks/useWatchFont';

import styles from './ArticleList.module.scss';

const ArticleList = ({
  articles,
}: {
  articles: Array<{
    title: string;
    date: string;
    slug: string;
    description: string;
  }>;
}) => {
  const isRubikLoaded = useWatchFont('Rubik');

  const rubikLoadedClass = isRubikLoaded ? 'rubik-loaded' : '';
  return (
    <ul className={styles.titleList}>
      {articles.map((article) => (
        <li className={styles.blockList} key={article.slug}>
          <Link href={`/${article.slug}`}>
            <a className={rubikLoadedClass}>
              <h2 className={styles.titleItem}>{article.title}</h2>
              <p>{article.description}</p>
              <p>{article.date}</p>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ArticleList;
