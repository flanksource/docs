import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Tag from '@theme/Tag';
import styles from './styles.module.css';
export default function TagsListInline({ tags }) {
  return (
    <>
      <div className='flex w-full max-w-full flex-row flex-wrap gap-y-1 spacing-x-2'>
        {tags.map((tag) => (
          <Tag key={tag.permalink} {...tag} />
        ))}
      </div>
    </>
  );
}
