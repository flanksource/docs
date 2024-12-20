import React from 'react';
import clsx from 'clsx';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import BlogAuthor from '@theme/Blog/Components/Author';
import styles from './styles.module.css';
// Component responsible for the authors layout
export default function BlogPostItemHeaderAuthors({ className, short = false }) {
  const {
    metadata: { authors },
    assets,
  } = useBlogPost();
  const authorsCount = authors.length;
  if (authorsCount === 0) {
    return null;
  }
  const imageOnly = authors.every(({ name }) => !name);
  const singleAuthor = authors.length === 1;
  return (
    <div
      className={clsx(
        'margin-top--md margin-bottom--sm',
        imageOnly ? styles.imageOnlyAuthorRow : 'row',
        className,
      )}>
      {authors.map((author, idx) => (
        <div
          className={clsx(
            "ml-4 space-x-2",
            imageOnly ? styles.imageOnlyAuthorCol : styles.authorCol,
          )}
          key={idx}>
          <BlogAuthor
            short={short}
            author={{
              ...author,
              // Handle author images using relative paths
              imageURL: assets.authorsImageUrls[idx] ?? author.imageURL,
            }}
          />
        </div>
      ))
      }
    </div >
  );
}
