import React from 'react';

export default function Highlight({ children, color }) {
  return (
    <span
      style={{
        backgroundColor: color,
        borderRadius: '2px',
        color: '#fff',
        padding: '0.2rem',
      }}>
      {children}
    </span>
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
      Commercial Edition Only
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
      Standard Edition Only
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
      Enterprise Edition Only
    </span>
  );
}

