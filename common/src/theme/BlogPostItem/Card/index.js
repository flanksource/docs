import React from 'react';
import clsx from 'clsx';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import BlogPostItemHeader from '@theme/BlogPostItem/Header';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';
import { Card } from '@site/src/components/Card'
import TagsListInline from '@theme/TagsListInline'
// apply a bottom margin in list view
function useContainerClassName() {
  const { isBlogPostPage } = useBlogPost();
  return !isBlogPostPage ? 'margin-bottom--xl' : undefined;
}

export default function BlogPostCard({ children, post, url, }) {
  const containerClassName = useContainerClassName();
  return (
    <Card link={post.metadata.permalink} height="h-64">
      <BlogPostItemContainer >
        <BlogPostItemHeader />
        <span className='text-gray-900 line-clamp-2 pb-2'>{post.metadata.description}</span>
        <TagsListInline tags={post.metadata.tags} />
      </BlogPostItemContainer >
    </Card>

  );
}



