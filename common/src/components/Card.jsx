import React from 'react';
import Link from '@theme/MDXComponents/A'
import Icon from '@site/src/components/Icon'
import clsx from 'clsx'

export const Card = ({
  title,
  icon,
  height = 'h-32',
  link,
  variant = 'primary',
  sidebar,
  children
}) => {
  if (sidebar) {
    link = sidebar.href;
    if (sidebar.customProps?.icon) {
      icon = <Icon name={sidebar.customProps?.icon}/>
    }
    title = sidebar.label;
  }
  if (icon && typeof(icon) == 'string') {
    icon = <Icon name={icon}/>
  }
  const cardContent = (
    <div className={clsx(height, "flex border border-slate-200 border-solid hover:border-slate-300 hover:shadow-lg rounded-lg p-5")}>
      <div className="items-start flex-col flex-grow justify-around flex">
        <span className="flex flex-row items-center space-x-1 ">
          {icon && icon}<span className='text-2xl'>{title}</span>
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
    <div className="text-slate-900 grid grid-cols-3 flex gap-x-4 gap-y-4 ">
      {children}
    </div>
  );
};




