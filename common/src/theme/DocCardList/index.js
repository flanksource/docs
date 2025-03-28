import React from 'react';
import clsx from 'clsx';
import { Card, Cards } from '@site/src/components/Card'

import { usePluginData } from '@docusaurus/useGlobalData';
import { getActiveDocContext, useAllDocsData, useDocsSidebar, useDocsData, useDocRootMetadata, useActiveVersion, useActivePlugin, findSidebarCategory, useDoc } from "@docusaurus/plugin-content-docs/client"
import {
  useCurrentSidebarCategory,
  filterDocCardListItems,
} from '@docusaurus/plugin-content-docs/client';

function DocCardListForCurrentSidebarCategory({ className }) {
  const category = useCurrentSidebarCategory();
  return <DocCardList items={category.items} className={className} />;
}

export default function DocCardList(props) {
  const { items, className } = props;


  if (!items) {
    return <DocCardListForCurrentSidebarCategory />

  }
  const filteredItems = filterDocCardListItems(items).filter(i => !(i.customProps && i.customProps.category));
  return (
    <>
      <Cards>
        {props.items.map((item, index) => {
          if (item.customProps && item.customProps.category) {
            return null;
          }
          return <Card sidebar={item} key={index} />
        })
        }

      </Cards>
    </>
  );
}
