import React from 'react';
import { LearnMore } from './LearnMore';

export function FeatureBody({ title, subtitle, url, id, children }) {
  // Generate ID from title if not provided
  const anchorId = id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-blue-600 uppercase" >
        {subtitle}
      </h2 >
      <p
        id={anchorId}
        className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl scroll-mt-20"
      >
        {title}
      </p>
      <p className="mt-6 text-lg  text-gray-600">
        {children}
      </p>
      <LearnMore url={url} className="mt-3" />
    </>
  )
};
