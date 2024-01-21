import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

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
      <a href="/concepts/image-variants" style={{ color: "white" }}>Full Image Variant Required</a>
    </span >
  );
}


export function SkipOSS({ children }) {
  const { siteConfig, siteMetadata } = useDocusaurusContext();
  if (siteConfig.customFields.oss) {
    return null
  }
  // if (Array.isArray(children)) {
  //   if (children.length == 0) {
  //     return null
  //   }
  //   return <>
  //     {
  //       children.forEach(i => {
  //         { i }
  //       })
  //     }
  //   </>
  // }
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
