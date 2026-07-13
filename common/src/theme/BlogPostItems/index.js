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
    <div className='pt-16 container'>
      <Cards>
        {items.map(({ content: BlogPostContent }) => (
          <BlogPostProvider
            key={BlogPostContent.metadata.permalink}
            content={BlogPostContent}>
            <BlogPostCard post={BlogPostContent} className="w-full" />

          </BlogPostProvider>
        ))}

      </Cards>

    </div>
  );
}
