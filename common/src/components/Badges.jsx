import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { GoDotFill } from "react-icons/go";
import clsx from 'clsx'
import { CommonLink } from './Link'
export function Health({ color, children }) {
  return <span className='rounded rounded-sm bg-zinc-100' style={{
    fontSize: '0.85rem',
    borderRadius: '5px',
    marginLeft: "3px",
    padding: '0.3rem',
  }}> <GoDotFill className={clsx(color, "my-auto")} />{children}</span>
}
export function Unhealthy({ children }) {
  return <Health color="fill-red-400">{children}</Health>

}
export function Healthy({ children }) {
  return <Health color="fill-green-400">{children}</Health>

}
export function Warning({ children }) {
  return <Health color="fill-orange-400">{children}</Health>
}

export function FullImage({ color }) {
  return (
    <span
      style={{
        backgroundColor: 'gray',
        fontSize: '0.7rem',
        borderRadius: '5px',
        color: 'white',
        marginLeft: "3px",
        padding: '0.3rem',
      }}>
      <CommonLink to="image-variants#full">Full Image</CommonLink> variant required.
    </span >
  );
}


export function SkipOSS({ children }) {
  const { siteConfig, siteMetadata } = useDocusaurusContext();
  if (siteConfig.customFields.oss) {
    return null
  }

  return <> {children} </>

}

export function SkipCommercial({ children }) {
  const { siteConfig, siteMetadata } = useDocusaurusContext();
  if (!siteConfig.customFields.oss) {
    return null
  }

  return <> {children} </>

}



export function Commercial({ color }) {
  return null

}


export function Standard({ color }) {
  const { siteConfig, siteMetadata } = useDocusaurusContext();
  if (siteConfig.customFields.oss) {
    return null
  }
  return (
    <span
      style={{
        backgroundColor: 'gray',
        fontSize: '0.7rem',
        borderRadius: '5px',
        color: 'white',
        padding: '0.3rem',
        paddingBottom: "5px"
      }}>
      Standard Edition Required
    </span>
  );
}


export function CustomField({ name }) {
  return siteConfig.customFields[name]
}

export function Enterprise({ color }) {
  const { siteConfig, siteMetadata } = useDocusaurusContext();
  if (siteConfig.customFields.oss) {
    return null
  }
  return (
    <span
      style={{
        backgroundColor: 'gray',
        fontSize: '0.7rem',
        borderRadius: '5px',
        color: 'white',
        padding: '0.3rem',
        marginBottom: "5px"
      }}>
      Enterprise Edition Required
    </span>
  );
}



export function Advanced({ color, children }) {
  return (
    <span
      title={children}
      style={{
        backgroundColor: 'gray',
        fontSize: '0.7rem',
        borderRadius: '5px',
        color: 'white',
        padding: '0.3rem',
        marginBottom: "5px"
      }}>
      Advanced
    </span>
  );
}
