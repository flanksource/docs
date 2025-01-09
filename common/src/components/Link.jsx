import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

export function CommonLink({ children, to, anchor }) {
  const { siteConfig } = useDocusaurusContext();
  let url = useBaseUrl(siteConfig.customFields.links[to])
  if (anchor != null) {
    url += "#" + anchor
  }
  return <Link to={url}>{children}</Link>
};

