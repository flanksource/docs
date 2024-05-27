import React from 'react';

import MDXContent from '@theme/MDXContent';

export default function Step({ name, step, children, style = "tutorial", anchor }) {
  return <MDXContent >

    <span className="step-anchor" id={anchor} />
    <span class="flex flex-row items-center gap-2 my-2 p-2 rounded-md bg-zinc-100 step-container">
      <span class="flex flex-row items-center gap-2">
        <img
          src={`/img/icons/circled-${step}.svg`}
          // style={{ height: { height } }}
          className={style == "tutorial" ? "inline-block object-center h-7" : "inline-block object-center h-6"} />
      </span>
      <span className={style == "tutorial" ? "text-lg text-gray-700 " : "text-md text-gray-700 "}>{name}{anchor &&
        <a href={`#${anchor}`} class="hash-link" />
      }</span>

    </span>
    <div className="pl-8 ">
      {children}
    </div>

  </MDXContent >
}


