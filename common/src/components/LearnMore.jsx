import React from 'react';

export function LearnMore({ url, className }) {
  return (

    <div className={className}>
      <a href={url} target="_blank" className={`text-base cursor-pointer font-semibold leading-6 text-blue-600 mt-5`}>Learn More <span aria-hidden="true">→</span></a>
    </div>

  );
}
