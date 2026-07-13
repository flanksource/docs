import React from 'react'
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title'
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info'
import BlogPostItemHeaderAuthors from '@theme/BlogPostItem/Header/Authors'
import { useBlogPost } from '@docusaurus/plugin-content-blog/client'
import clsx from 'clsx'
import styles from './styles.module.css'

export default function BlogPostItemHeader() {
  const { isBlogPostPage } = useBlogPost()

  return (
    <header className={clsx(isBlogPostPage && styles.postHeader)}>
      {isBlogPostPage && <BlogPostItemHeaderInfo className={styles.postInfo} />}
      <BlogPostItemHeaderTitle />
      {!isBlogPostPage && <BlogPostItemHeaderInfo />}
      {!isBlogPostPage && <BlogPostItemHeaderAuthors short={true} />}
    </header>
  )
}
