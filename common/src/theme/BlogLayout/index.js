import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
export default function BlogLayout(props) {
  const { sidebar, toc, children, ...layoutProps } = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;
  return (
    <Layout {...layoutProps}>
      <div className="container w-full mx-auto  ">
        <div className="flex flex-row" >
          <BlogSidebar sidebar={sidebar} />
          <div className='flex-1' />
          <main
            className>
            {children}
          </main>
          {toc && <div className="col col--2">{toc}</div>}
          <div className='flex-1' />
        </div>
      </div>
    </Layout>
  );
}
