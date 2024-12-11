import React from 'react';
import clsx from 'clsx';

export default function BlogPostItemContainer({ children, className }) {
  return <article className={clsx(className, "w-full")}>{children}</article>;
}
