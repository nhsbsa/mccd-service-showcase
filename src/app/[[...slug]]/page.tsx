import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import React from 'react';
import { MDXRemoteProps } from 'next-mdx-remote';
import MDXContent from '@/components/MDXContent';
import Breadcrumbs from '@/components/Breadcrumbs';
import { processDataDirectory } from '@/lib/helpers/process-data-directory';

type Props = {
  params: {
    slug: never[]
  }
}

export const dynamicParams = false;
const contentDir = 'public/content';

const getData = async () => {
  const dataDirectory = path.resolve(path.join(process.cwd(), 'public/data/site-data.json'));
  let data: never[] = [];
  if (fs.existsSync(dataDirectory)) {
    const fileData = fs.readFileSync(dataDirectory, 'utf8');
    data = JSON.parse(fileData);
  }
  return data;
};

async function getContent(slug = []) {
  const paths: { [key: string]: string } = {
    dir: path.join(contentDir, `${slug.join('/')}/index.mdx`),
    constructed: path.join(contentDir, `${slug.join('/')}.mdx`),
  };
  const readContent = async (file = '') => {
    const markdownWithMeta = fs.readFileSync(file, 'utf-8');
    const defaultData = await getData();
    const mdxSource = await serialize<MDXRemoteProps>(markdownWithMeta, {
      parseFrontmatter: true,
      scope: { defaultData },
    });
    return {
      source: mdxSource,
    };
  };
  let obj: any = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const pathsKey in paths) {
    if (fs.existsSync(paths[pathsKey])) {
      // eslint-disable-next-line no-await-in-loop
      obj = await readContent(paths[pathsKey]);
      return obj;
    }
  }
  return obj;
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const { slug } = params;
  const { source } = await getContent(slug);

  return {
    title: source.frontmatter?.title || 'Hippo Digital',
    description: source.frontmatter?.description || 'Another great project from Hippo Digital',
  };
}

async function getFiles(dir = '') {
  const fileList = fs.readdirSync(dir);
  const promises: any = [];

  Object.values(fileList).forEach((file) => {
    const name = `${dir}/${file}`;

    if (fs.statSync(name).isDirectory()) {
      promises.push(getFiles(name));
    } else if (path.extname(file) === '.mdx') {
      const slug = name
        .replace(contentDir, '')
        .replace('.mdx', '')
        .replace('index', '')
        .split('/')
        .filter((element) => element);

      promises.push(
        (async () => {
          const { source } = await getContent(slug as never);
          return {
            slug,
            url: `/${slug.join('/')}`,
            file: name,
            ...source.frontmatter,
          };
        })(),
      );
    }
  });

  const files = await Promise.all(promises);
  return files.flat();
}

export async function generateStaticParams() {
  const inputDirectory = 'public/csv';
  const outputDirectory = 'public/data';

  try {
    await processDataDirectory(inputDirectory, outputDirectory);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('An error occurred:', error);
  }

  const files = await getFiles(contentDir);
  const sorted = files.sort((a, b) => ((a.url > b.url) ? 1 : -1));

  const dataDirectory = path.join(process.cwd(), 'public/data');
  const dataFile = path.join(dataDirectory, 'site-data.json');
  await fs.promises.writeFile(dataFile, JSON.stringify(sorted, null, 2));

  return sorted;
}

export default async function Home({ params }: Props) {
  const { slug } = params;
  const { source } = await getContent(slug);
  const { breadcrumbs, title } = source.frontmatter;

  if (!source) {
    notFound();
  }
  return (
    <div className="govuk-width-container">
      {source.frontmatter?.breadcrumbs
        ? <Breadcrumbs breadcrumbs={breadcrumbs} currentPage={title} /> : null}
      <main id="mainContent" className="govuk-main-wrapper">
        <MDXContent
          compiledSource={source.compiledSource}
          scope={source.scope}
          frontmatter={source.frontmatter}
        />
      </main>
    </div>
  );
}
