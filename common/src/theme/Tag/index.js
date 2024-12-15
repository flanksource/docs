import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
export default function Tag({ permalink, label, count, description }) {
  return (
    <div className="mr-2">
      <Link
        href={permalink}

        title={description}
      >

        <span className="inline-flex text-nowrap items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">{label}</span>
        {count && <span>{count}</span>}
      </Link>
    </div>
  );
}
