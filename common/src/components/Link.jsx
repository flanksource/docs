import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';

export function CommonLink({ children, to, anchor }) {
  const { siteConfig } = useDocusaurusContext();
  let url = siteConfig.customFields.links[to]
  if (anchor != null) {
    url += "#" + anchor
  }
  return <Link to={url}>{children}</Link>
};

