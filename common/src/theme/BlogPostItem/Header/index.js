import React from 'react';
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title';
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info';
import BlogPostItemHeaderAuthors from '@theme/BlogPostItem/Header/Authors';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import clsx from 'clsx';
export default function BlogPostItemHeader() {

  return (
    <header className={clsx()}>
      {/* Blog: {blog} */}
      <BlogPostItemHeaderTitle />
      <BlogPostItemHeaderInfo />
      <BlogPostItemHeaderAuthors short={true} />
    </header>
  );
}
