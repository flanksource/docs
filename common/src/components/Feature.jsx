
import React from 'react';
import { FeatureBody } from './FeatureBody';
export function Feature({ image, title, subtitle, url, left = true, children, }) {

  var icon = image
  if ((typeof image) === 'string') {
    icon = <img
      className="relative mx-auto rounded-lg  image-rendering-crisp max-h-80 object-contain"
      src={`/img/${image}`}
      alt={title}
    />
  }
  if (left) {
    return (
      <div className="overflow-hidden bg-white py-24 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <FeatureBody title={title} subtitle={subtitle} url={url}>
                  {children}
                </FeatureBody>
              </div>
            </div>
            {icon}
          </div>
        </div>
      </div >
    )
  }
  return (

    <div className="overflow-hidden bg-white py-24 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {icon}
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <FeatureBody title={title} subtitle={subtitle} url={url}>
                {children}
              </FeatureBody>
            </div>
          </div>
        </div>
      </div>
    </div >

  )
};
