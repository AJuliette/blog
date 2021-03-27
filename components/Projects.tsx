import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useWatchFont from '../hooks/useWatchFont';
import styles from './Projects.module.scss';

const projects: Array<{
  title: string;
  description: string;
  src: string;
  path: string;
}> = [
  {
    title: 'Women On Rails: resources (🥖)',
    description:
      'Articles and curated links to help new developers find their first job. Built with Docusaurus.',
    src: '/ressources.png',
    path: 'https://women-on-rails.github.io/ressources/',
  },
  {
    title: 'Women On Rails: newsletter (🥖)',
    description: 'A bi-monthly newsletter with Ruby and Rails and web news.',
    src: '/newsletter.png',
    path: 'https://womenonrails.substack.com/',
  },
];

const Projects = () => {
  const isRubikLoaded = useWatchFont('Rubik');

  const rubikLoadedClass = isRubikLoaded ? 'rubik-loaded' : '';

  return (
    <section className="block">
      <p className="highlight">Projects</p>
      <ul className={styles.flex}>
        {projects.map((project) => (
          <li className={styles.blockList}>
            <Link href={project.path}>
              <a className={rubikLoadedClass} target="_blank">
                <Image src={project.src} width="300" height="200" />
                <p className={styles.title}>{project.title}</p>
                <p>{project.description}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Projects;
