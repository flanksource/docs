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
    <Card link={post.metadata.permalink} height="h-72">
      <BlogPostItemContainer className="h-full flex flex-col">
        <BlogPostItemHeader />
        <span className='text-left text-gray-900 line-clamp-2 mb-2'>{post.metadata.description}</span>
        <div className='mt-auto'>
          <TagsListInline tags={post.metadata.tags} />
        </div>
      </BlogPostItemContainer >
    </Card>

  );
}
