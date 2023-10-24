'use client';

import React, { useEffect, useState } from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
import { MdxComponents } from '@/components/MdxComponents';

const readContent = async (contents = '') => {
  try {
    const mdxSource = await serialize<MDXRemoteProps>(contents, {
      mdxOptions: {
        development: process.env.NODE_ENV === 'development',
      },
      parseFrontmatter: false,
      scope: {},
    });
    return { mdxSource, error: null };
  } catch (error) {
    return { mdxSource: null, error };
  }
};

export const Include = ({ path }) => {
  const [content, setContent] = useState<{
    mdxSource: MDXRemoteProps | null;
    error: Error | null;
  }>({
    mdxSource: null,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/includes/${path}`);
        if (!response.ok) {
          setContent({ mdxSource: null, error: { message: path } as Error });
          return;
        }
        const file = await response.text();

        if (!/\.(md|mdx)$/.test(path)) {
          throw new Error(`Invalid file extension for ${path}`);
        }

        const { mdxSource, error } = await readContent(file);

        if (error) {
          throw error;
        }

        setContent({ mdxSource, error: null });
      } catch (error) {
        setContent({ mdxSource: null, error: error as Error });
      }
    };

    setContent({ mdxSource: null, error: null });

    fetchData();
  }, [path]);

  if (content.error) {
    return (
      <p>
        Error loading file:
        {' '}
        {content.error.message}
      </p>
    );
  }

  if (content.mdxSource) {
    return (
      <MDXRemote
        compiledSource={content.mdxSource.compiledSource}
        scope={{}}
        frontmatter={{}}
        components={MdxComponents}
      />
    );
  }

  return <p>Loading...</p>;
};
