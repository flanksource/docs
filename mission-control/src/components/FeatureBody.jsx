import React from 'react';
import { LearnMore } from './LearnMore';

export function FeatureBody({ title, subtitle, url, children }) {
  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-indigo-600 uppercase">{subtitle}</h2>
      <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</p>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        {children}
      </p>
      <LearnMore url={url} />
    </>
  )
};
