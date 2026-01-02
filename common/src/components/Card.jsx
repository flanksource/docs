import React from 'react';
import Link from '@theme/MDXComponents/A'
import Icon from '@site/src/components/Icon'
import clsx from 'clsx'

export const Card = ({
  title,
  icon,
  size = "md",
  height = 'min-h-20 md:min-h-32',
  link,
  href,
  variant = 'primary',
  sidebar,
  children
}) => {
  link = link || href;
  if (sidebar) {
    link = sidebar.href;
    if (sidebar.customProps?.icon) {
      icon = <Icon name={sidebar.customProps?.icon} />
    }
    title = sidebar.label;
  }
  if (icon && typeof (icon) == 'string') {
    icon = <Icon name={icon} />
  }
  const cardContent = (
    <div className={clsx(height, "flex border border-slate-200 border-solid hover:border-slate-300 hover:shadow-lg rounded-lg", size == "md" && "p-2 sm:p-5", size == "sm" && "p-1 sm:p-2", size)}>
      <div className="items-start flex-col flex-grow justify-around flex">
        <span className="flex flex-row items-center space-x-1 ">
          {icon && icon}<span className={clsx(size == "md" && 'text-2xl', size == "sm" && "text-xl")}>{title}</span>
        </span>
        {children}
      </div>
    </div>

  );

  if (link) {
    return <Link to={link} className='unstyled  '>{cardContent}</Link>;
  }

  return cardContent;
};
export const Cards = ({ columns = 3, children }) => {
  return (
    <div className="text-slate-900 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4">
      {children}
    </div>
  );
};




