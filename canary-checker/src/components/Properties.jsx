import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Properties({ args = [] }) {

  const { siteConfig } = useDocusaurusContext();
  const oss = siteConfig.customFields.oss;


  return (

    <>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Description</th>
            <th>Scheme</th>
            <th>Required</th>
          </tr>
        </thead>
        <tbody>

          {
            args.map((arg, index) => (
              <>
                {
                  typeof (arg) === 'function' ? v() :
                    <tr key={index}>
                      <td><code>{arg.name}</code></td>
                      <td>{arg.description}</td>
                      <td><code>{arg.scheme}</code></td>
                      <td>{arg.required ? 'Yes' : 'No'}</td>
                    </tr>
                }
              </>
            ))
          }
        </tbody>
      </table>

    </>
  );

}
