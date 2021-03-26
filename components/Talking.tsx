import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { sortBy } from 'lodash';
import styles from './Index.module.scss';
import useWatchFont from '../hooks/useWatchFont';

const unsortedTalks: Array<{
  date: Date;
  title: string;
  description: string;
  emoji: string;
  path: string;
}> = [
  {
    date: new Date('2020-02-10'),
    title: 'GDPR for developers (🥖)',
    description:
      'A guide to help you code while respecting the privacy of your users',
    emoji: '📚',
    path:
      'https://speakerdeck.com/ajuliette/rgpd-pour-developpeur-dot-se-dot-s',
  },
  {
    date: new Date('2020-03-02'),
    title: 'Introduction to StimulusJS (🥖)',
    description: 'How to use StimulusJS with Rails',
    emoji: '⚡',
    path: 'https://github.com/women-on-rails/stimulus-tutorial',
  },
  {
    date: new Date('2020-01-27'),
    title: 'Ruby and Rails Questions',
    description:
      'From basic to advanced: test how well you know Ruby and Ruby on Rails',
    emoji: '💎',
    path: 'https://github.com/women-on-rails/ruby-and-ror-questions',
  },
  {
    date: new Date('2020-10-07'),
    title: 'How to contribute to Hacktoberfest (🥖)',
    description: 'Write your first contribution to an open-source project !',
    emoji: '✋',
    path:
      'https://drive.google.com/file/u/3/d/1iJoN31iShNRy2vCGuS_FRYZG3NZQFqP4/view?usp=sharing',
  },
  {
    date: new Date('2020-12-03'),
    title: 'Fireside: You can code (🥖)',
    description:
      'A fourty minutes workshop to learn to write your first lines of Ruby code',
    emoji: 'ℹ️',
    path: 'https://www.youtube.com/watch?v=8LMKII95RfM',
  },
];

const talks = sortBy(unsortedTalks, (talk) => -talk.date.getTime()).map(
  (talk) => ({
    date: format(talk.date, 'MMM d yyyy'),
    title: talk.title,
    description: talk.description,
    emoji: talk.emoji,
    path: talk.path,
  })
);

const Talking = () => {
  const isRubikLoaded = useWatchFont('Rubik');

  const rubikLoadedClass = isRubikLoaded ? 'rubik-loaded' : '';

  return (
    <section className="block">
      <p className="highlight">Talks / Workshops</p>
      <ul className={styles.titleList}>
        {talks.map((talk) => (
          <li className={styles.blockList} key={talk.path}>
            <Link href={talk.path}>
              <a className={rubikLoadedClass} target="_blank">
                <div className={styles.mediaObject}>
                  <div className={styles.emoji}>{talk.emoji}</div>
                  <div>
                    <h2 className={styles.titleItem}>{talk.title}</h2>
                    <p>{talk.description}</p>
                    <p className={styles.dateItem}>{talk.date}</p>
                  </div>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Talking;
