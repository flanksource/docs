import React from 'react';

export default function Step({ name, step, children, style = "tutorial" }) {
  return <>
    <span class="flex flex-row items-center gap-2 pt-2">
      <span class="flex flex-row items-center gap-2">
        <img
          src={`/img/icons/circled-${step}.svg`}
          // style={{ height: { height } }}
          className={style == "tutorial" ? "inline-block object-center h-7" : "inline-block object-center h-6"} />
      </span>
      <span className={style == "tutorial" ? "text-lg text-gray-600 " : "text-md font-bold"}>{name}</span>
    </span>
    <div className="pl-8 ">
      {children}
    </div>
  </>
}


