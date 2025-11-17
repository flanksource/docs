/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {translate} from '@docusaurus/Translate';
import {PageMetadata} from '@docusaurus/theme-common';
import {useLocation} from '@docusaurus/router';
import Layout from '@theme/Layout';
import NotFoundContent from '@theme/NotFound/Content';
import Navigation from '@site/src/components/flanksource/Navigation';

export default function Index() {
  const title = translate({
    id: 'theme.NotFound.title',
    message: 'Page Not Found',
  });

  const location = useLocation();

  // Pages that use custom Navigation component (non-docs marketing/product pages)
  const customNavPaths = [
    '/mission-control',
    '/canary-checker',
    '/pricing',
    '/about',
    '/contact',
    '/services',
    '/dns-sync',
    '/batch-runner',
  ];

  // Check if current path matches a custom nav page
  const useCustomNav = customNavPaths.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <PageMetadata title={title} />
      <Layout noHeader={useCustomNav}>
        {useCustomNav && <Navigation />}
        <NotFoundContent />
      </Layout>
    </>
  );
}
