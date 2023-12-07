import React from 'react';


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


export function Commercial({ color }) {
  return (
    <span
      style={{
        backgroundColor: 'gray',
        fontSize: '0.7rem',
        borderRadius: '5px',
        color: 'white',
        padding: '0.3rem',
      }}>
      Commercial Edition Required
    </span>
  );
}


export function Standard({ color }) {
  return (
    <span
      style={{
        backgroundColor: 'gray',
        fontSize: '0.7rem',
        borderRadius: '5px',
        color: 'white',
        padding: '0.3rem',
      }}>
      Standard Edition Required
    </span>
  );
}


export function Enterprise({ color }) {
  return (
    <span
      style={{
        backgroundColor: 'gray',
        fontSize: '0.7rem',
        borderRadius: '5px',
        color: 'white',
        padding: '0.3rem',
      }}>
      Enterprise Edition Required
    </span>
  );
}
