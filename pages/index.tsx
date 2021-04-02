import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import matter from 'gray-matter';
import { sortBy } from 'lodash';
import { format } from 'date-fns';
import Layout from '../components/Layout';
import ArticleList from '../components/ArticleList';
import Welcome from '../components/Welcome';
import Talking from '../components/Talking';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

export const getStaticProps: GetStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), 'articles');
  const filenames = fs.readdirSync(postsDirectory);

  const unsortedArticles: Array<{
    date: Date;
    title: string;
    slug: string;
    description: string;
    emoji: string;
    path: string;
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
      path: '',
    };
  });

  unsortedArticles.push(
    {
      date: new Date('2020-11-02'),
      title: 'Create an open-source project on GitHub, the incremental way',
      slug: '',
      path:
        'https://blog.capsens.eu/create-an-open-source-project-on-github-the-incremental-way-e6106063546e',
      description: 'My experience on building a project in open-source',
      emoji: '👷',
    },
    {
      date: new Date('2020-10-02'),
      title: 'How to contribute to Hacktoberfest and not shitoberfest (🥖)',
      slug: '',
      path:
        'https://blog.capsens.eu/comment-contribuer-%C3%A0-hacktoberfest-et-non-shitoberfest-97cb4a4ea3cd',
      description:
        '2020 was the year where open source maintainers revolted against Hacktoberfest',
      emoji: '👩‍💻',
    },
    {
      date: new Date('2020-05-11'),
      title: 'How to improve your card style with spacing',
      slug: '',
      path:
        'https://blog.capsens.eu/how-to-improve-your-card-style-with-spacing-93d23d1d06cb',
      description: "Because it's classy",
      emoji: '⬜',
    },
    {
      date: new Date('2020-05-10'),
      title: 'Getting along with CSS',
      slug: '',
      path: 'https://blog.capsens.eu/getting-along-with-css-e9855af2759d',
      description: 'How to get CSS to do what you actually want',
      emoji: '🎨',
    }
  );

  const articles = sortBy(
    unsortedArticles,
    (article) => -article.date.getTime()
  ).map((art) => ({
    slug: art.slug,
    date: format(art.date, 'MMM d yyyy'),
    title: art.title,
    description: art.description,
    emoji: art.emoji,
    path: art.path,
  }));

  return {
    props: {
      articles,
    },
  };
};

const description =
  "Where I post my articles, projects, tutorials for workshops. I'm a back-end Ruby on Rails developer, with a strong interest for front-end.";
const title = "Juliette Audema's portfolio";
const twitterHandle = 'ajuliette_dev';
const siteName = "AJuliette's Blog";

const imagesDirectory = path.join(process.cwd(), 'public');
const filename = 'profile.jpeg';
const previewImage = path.join(imagesDirectory, filename);

export default function Home({
  articles,
}: {
  articles: Array<{
    title: string;
    date: string;
    slug: string;
    description: string;
    emoji: string;
    path: string;
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
        <meta property="og:image" content={previewImage} key="ogimage" />
        <meta property="og:site_name" content={siteName} key="ogsitename" />

        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content={twitterHandle} key="twhandle" />
      </Head>
      <Layout>
        <Welcome />
        <ArticleList articles={articles} />
        <Talking />
        <Projects />
        <Contact />
      </Layout>
    </>
  );
}
