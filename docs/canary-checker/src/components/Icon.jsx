import React from "react";
export default function Icon({ name, height = "32px", className, url }) {
  let img = <img
    src={`/img/icons/${name}.svg`}
    style={{ height: { height } }}
    className={className}
  />;

  if (url != null) {
    return <a href={url} className="pr-2">{img}</a>;
  }
  return img
}
