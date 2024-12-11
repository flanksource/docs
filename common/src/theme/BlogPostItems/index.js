import React from 'react';
import { BlogPostProvider } from '@docusaurus/plugin-content-blog/client';
import BlogPostItem from '@theme/BlogPostItem';
import BlogPostCard from '../BlogPostItem/Card';
import { Cards } from '@site/src/components/Card'
export default function BlogPostItems({
  items,
  component: BlogPostItemComponent = BlogPostItem,
}) {
  return (
    <div className='pt-10 container'>
      <h1>Flanksource Blog</h1>
      <Cards>
        {items.map(({ content: BlogPostContent }) => (
          <BlogPostProvider
            key={BlogPostContent.metadata.permalink}
            content={BlogPostContent}>

            <BlogPostCard url={BlogPostContent.metadata.permalink} className="w-full" />

          </BlogPostProvider>
        ))}

      </Cards>

    </div>
  );
}

