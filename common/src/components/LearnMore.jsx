import React from 'react';

export function LearnMore({ url }) {
  return (

    <a href={url} target="_blank" className="text-md font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a>

  );
}
