import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import matter from 'gray-matter';
import { sortBy } from 'lodash';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Layout from '../components/Layout';
import ArticleList from '../components/ArticleList';
import Welcome from '../components/Welcome';

export const getStaticProps: GetStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), 'articles');
  const filenames = fs.readdirSync(postsDirectory);

  const unsortedArticles: Array<{
    date: Date;
    title: string;
    slug: string;
    description: string;
    emoji: string;
  }> = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return {
      date: new Date(data.date),
      title: data.title,
      slug: filename.replace(/.mdx$/, ''),
      description: data.description,
      emoji: data.emoji,
    };
  });

  const articles = sortBy(
    unsortedArticles,
    (article) => -article.date.getTime()
  ).map((art) => ({
    slug: art.slug,
    date: format(art.date, 'MMM d yyyy'),
    title: art.title,
    description: art.description,
    emoji: art.emoji,
  }));

  return {
    props: {
      articles,
    },
  };
};

const description = 'Blog de Juliette Audema';
const title = 'AJuliette';

export default function Home({
  articles,
}: {
  articles: Array<{
    title: string;
    date: string;
    slug: string;
    description: string;
    emoji: string;
  }>;
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💻</text></svg>"
        />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      <Layout>
        <Welcome />
        <ArticleList articles={articles} />
      </Layout>
    </>
  );
}
