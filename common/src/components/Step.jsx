import React from 'react';

import MDXContent from '@theme/MDXContent';

export default function Step({ name, step, children, style = "tutorial", anchor, from }) {

  if (style === "sub") {
    return <MDXContent>
      <div className="flex flex-row items-center gap-2">
        <span className="badge sub-step">{step}</span>
        <span className="text-md">{name}</span>
      </div>
      <div className="sub-step">
        {children}
      </div>
    </MDXContent >
  }
  return <MDXContent >

    <span className="step-anchor" id={anchor} />
    <span className="flex flex-row items-center gap-2 my-2 p-2 rounded-md bg-zinc-100 step-container">
      <span className="flex flex-row items-center gap-2">
        <span className="badge-dark-gray">{(from || 0) + step}</span>

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


