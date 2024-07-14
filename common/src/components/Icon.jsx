
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
  let img = <span className={clsx("align-middle", className)}><IconSVG className="my-auto" name={name} size={height} />
    <span className="pl-1.5">{children}</span>
  </span>

  if (url != null) {
    return <a href={url}>{img}</a>
  }
  return img
}

