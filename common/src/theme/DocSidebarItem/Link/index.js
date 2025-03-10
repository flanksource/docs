import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { isActiveSidebarItem } from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import Icon from '@site/src/components/Icon'
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import styles from './styles.module.css';
export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}) {
  const { href, label, className, autoAddBaseUrl } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);
  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className
      )}
      key={label}
    >
      <Link
        className={clsx(
          'menu__link',
          item.customProps?.icon && 'gap-x-1 ml-[-10px]',
          !isInternalLink && styles.menuExternalLink,
          {
            'menu__link--active': isActive
          }
        )}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined
        })}
        {...props}
      >
        {item.customProps?.icon && (
          <Icon
            name={item.customProps.icon}
            className="h-5 w-auto "
            height={32}
            style={{
              fill: 'var(--gray-500)'
            }}
          />
        )}
        {item.customProps?.label ??label}
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  )
}
