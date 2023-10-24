'use client';

import React from 'react';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
import { MdxComponents } from '@/components/MdxComponents';

export default function MDXContent({ compiledSource, scope, frontmatter }: MDXRemoteProps) {
  // @ts-ignore
  return (
    <MDXRemote
      compiledSource={compiledSource}
      scope={scope}
      frontmatter={frontmatter}
      components={MdxComponents}
    />
  );
}
