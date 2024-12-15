import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Tag from '@theme/Tag';
import styles from './styles.module.css';
export default function TagsListInline({ tags }) {
  return (
    <>
      <div className='flex flex-row spacing-x-2'>
        {tags.map((tag) => (
          <Tag key={tag.permalink} {...tag} />
        ))}
      </div>
    </>
  );
}
