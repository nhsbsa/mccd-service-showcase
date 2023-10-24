'use client';

import React from 'react';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
import { MdxComponents } from '@/components/MdxComponents';
import { Include } from '@/components/Include';

export default function MDXContent({
  compiledSource, scope, frontmatter,
}: MDXRemoteProps) {
  const Components = {
    ...MdxComponents,
    Include,
  };

  return (
    <MDXRemote
      compiledSource={compiledSource}
      scope={scope}
      frontmatter={frontmatter}
      components={Components}
    />
  );
}
