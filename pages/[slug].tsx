import fs from 'fs';
import Head from 'next/head';
import path from 'path';
import { GetStaticProps } from 'next';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import matter from 'gray-matter';
import { MDXProvider } from '@mdx-js/react';
import readingTime from 'reading-time';
import remarkPrism from 'remark-prism';
import Image from 'next/image';
import Layout from '../components/Layout';
import Youtube from '../components/Youtube';
import FileName from '../components/FileName';
import FooterArticle from '../components/FooterArticle';
import ArticleContainer from '../components/Article';
import { H2, H3, H4, H5 } from '../components/IdedHeaders';

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'articles');
  const filenames = fs.readdirSync(postsDirectory);
  return {
    paths: filenames.map(
      (filename) => ({ params: { slug: filename.replace(/\.mdx$/, '') } }) // See the "paths" section below
    ),
    fallback: false,
  };
}

const components = {
  Youtube,
  FileName,
  Image,
  FooterArticle,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const filePath = path.join(process.cwd(), 'articles', `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContents);
  const mdxSource = await renderToString(content, {
    components,
    mdxOptions: {
      rehypePlugins: [],
      remarkPlugins: [
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        [
          remarkPrism,
          {
            plugins: ['prismjs/plugins/line-numbers/prism-line-numbers'],
          },
        ],
      ],
    },
    scope: data,
  });
  mdxSource.scope.date = mdxSource.scope.date.toString();
  return {
    props: {
      article: {
        mdx: mdxSource,
        data: {
          ...data,
          date: data.date.toString(),
          readingTime: Math.round(
            readingTime(fileContents, { wordsPerMinute: 100 }).minutes
          ),
        },
      },
    },
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Article = ({ article }: { article: { mdx: any; data: any } }) => {
  const content = hydrate(article.mdx, {
    components,
  });
  const title = `AJuliette: ${article.data.title}`;
  const { description } = article.data;
  return (
    <>
      <Head>
        <title>AJuliette: {article.data.title}</title>
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
        <MDXProvider>
          <ArticleContainer
            title={article.data.title}
            timeToRead={article.data.readingTime}
            date={article.data.date}
            emoji={article.data.emoji}
          >
            {content}
          </ArticleContainer>
        </MDXProvider>
      </Layout>
    </>
  );
};
export default Article;
