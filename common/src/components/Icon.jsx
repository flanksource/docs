
import React from "react";
import { IconMap as Icons } from "@flanksource/icons/mi";
import clsx from "clsx"

export default function Icon({ name, height = 22, className, url, children }) {
  name = name
    .replaceAll("--", "-")
    .replaceAll("::", "-")
    .toLowerCase()
    .replaceAll("k8-", "k8s-")
    .replaceAll("kubernetes-", "k8s-");

  let IconSVG = Icons[name];

  if (!IconSVG) {
    return <span>{name}</span>
  }
  let img = <div className="inline-block spacing-x-2"><IconSVG className={clsx("align-middle", className)} name={name} size={height} />
    <span >{children}</span>
  </div>


  if (url != null) {
    return <a href={url}>{img}</a>
  }
  return img
}

