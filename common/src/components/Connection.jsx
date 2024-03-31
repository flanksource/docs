
import React from 'react';
import { Commercial } from './Highlight';

export var Connection = [
  {
    name: "connection",
    description: <>Path of an existing connection e.g. <code>connection://http/instance</code> <br /><Commercial /></>,
    scheme: <a href="/reference/connections">Connection</a>,
  },
  {
    name: "url",
    description: <>A HTTP endpoint e.g.  <code>http://example.com</code></>,
    scheme: "string",
    required: true
  },
  {
    name: "username",
    description: <>Username for HTTP Basic Auth</>,
    scheme: <a href="/reference/env-var">EnvVar</a>,
  },
  {
    name: "password",
    description: <>Password for HTTP Basic Auth</>,
    scheme: <a href="/reference/env-var">EnvVar</a>,
  }
];
