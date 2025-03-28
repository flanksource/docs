
import React from "react";
import { IconMap as Icons } from "@flanksource/icons/mi";
import { Icon as Iconify } from "@iconify/react";
import { VscJson } from "react-icons/vsc";
import clsx from "clsx"

export default function Icon({ name, height = 22, className, url, children, ...props }) {
  name = name
    .replaceAll("--", "-")
    .replaceAll("::", "-")
    .toLowerCase()
    .replaceAll("k8-", "k8s-")
    .replaceAll("kubernetes-", "k8s-");

  if (name == "config-db") {
    return <VscJson {...props}/>
  }

  if (name == "canary-checker") {
    name = "heart"
  }

  if (name =="getting-started") {
    name = "lsicon:path-outline"
  }
  if (name =="concepts") {
    name = "fluent:brain-circuit-24-regular"
  }

  if (name =="events") {
    name ="carbon:lightning"
  }

  if (name == "tutorial") {
    name = "learning"
  }



  if (name == "dedupe") {
    return <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
    <path d="M 17 4 L 17 6 L 44 6 L 44 40 L 36 40 L 36 42 L 46 42 L 46 4 L 17 4 z M 4 8 L 4 46 L 34 46 L 34 45 L 34 8 L 4 8 z M 6 10 L 32 10 L 32 44 L 6 44 L 6 10 z M 18 20 L 18 26 L 12 26 L 12 28 L 18 28 L 18 34 L 20 34 L 20 28 L 26 28 L 26 26 L 20 26 L 20 20 L 18 20 z"></path>
    </svg>
  }

  if (name =="rate-limit") {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props} width="20" height="20" viewBox="0 0 50 50">
    <path d="M 25 2 C 12.316406 2 2 12.316406 2 25 C 2 37.683594 12.316406 48 25 48 C 37.683594 48 48 37.683594 48 25 C 48 12.316406 37.683594 2 25 2 Z M 32.5 16.1875 C 37.601563 16.1875 38.09375 21.007813 38.09375 22.90625 C 38.09375 23.605469 38.09375 24.210938 38.09375 24.8125 C 38.09375 30.3125 36.90625 33.40625 32.40625 33.40625 C 28.90625 33.40625 26.6875 31.511719 26.6875 24.8125 C 26.789063 18.914063 28.398438 16.1875 32.5 16.1875 Z M 14.3125 16.5 L 22.6875 16.5 L 22.6875 18.3125 L 15.90625 18.3125 L 15 23.1875 C 15.699219 22.488281 16.789063 22 18.1875 22 C 22.585938 22 23.6875 25.511719 23.6875 27.8125 C 23.6875 31.511719 20.886719 33.40625 17.6875 33.40625 C 13.789063 33.40625 12.3125 30.59375 12.3125 28.59375 L 14.3125 28.59375 C 14.3125 29.695313 15.207031 31.6875 17.90625 31.6875 C 20.605469 31.6875 21.5 29.289063 21.5 27.6875 C 21.5 25.1875 19.6875 23.8125 17.6875 23.8125 C 15.988281 23.8125 14.898438 24.90625 14.5 25.40625 L 12.6875 25.3125 Z M 32.5 17.90625 C 29.898438 17.90625 29 20.507813 29 23.40625 L 29 24.8125 C 29 29.8125 30 31.6875 32.5 31.6875 C 34.699219 31.6875 36 30.210938 36 24.8125 L 36 23.40625 C 36 21.707031 35.601563 17.90625 32.5 17.90625 Z"></path>
    </svg>
  }

  if (name == "scraper") {
    return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" {...props} viewBox="0 0 50 50">
    <path d="M 28.992188 7 C 23.983187 7 19.408891 9.4429063 17.212891 13.878906 C 16.077891 13.127906 14.747469 12.722656 13.355469 12.722656 C 9.6514687 12.722656 6.6102812 15.610953 6.3632812 19.251953 C 2.5812812 20.629953 1.1842379e-15 24.258078 0 28.330078 C 0 33.662078 4.3379219 38 9.6699219 38 L 24.179688 38 C 24.069688 37.348 24 36.683 24 36 C 24 29.373 29.373 24 36 24 C 42.218 24 47.330453 28.728156 47.939453 34.785156 C 49.224453 33.242156 50 31.260609 50 29.099609 C 50 24.538609 46.554906 20.767859 42.128906 20.255859 C 42.138906 20.064859 42.142578 19.878312 42.142578 19.695312 C 42.142578 12.444312 36.243188 7 28.992188 7 z M 36 26 C 30.488997 26 26 30.488997 26 36 C 26 41.511003 30.488997 46 36 46 C 38.396508 46 40.597385 45.148986 42.322266 43.736328 L 48.292969 49.707031 L 49.707031 48.292969 L 43.736328 42.322266 C 45.148986 40.597385 46 38.396508 46 36 C 46 30.488997 41.511003 26 36 26 z M 36 28 C 40.430123 28 44 31.569877 44 36 C 44 40.430123 40.430123 44 36 44 C 31.569877 44 28 40.430123 28 36 C 28 31.569877 31.569877 28 36 28 z"></path>
    </svg>
  }

  let IconSVG = Icons[name];

  if (!IconSVG) {
    return <Iconify icon={name} {...props} height={20} width={20}/>
  }
  let img = <div className="inline-block spacing-x-2"><IconSVG className={clsx("align-middle", className)} name={name} size={height} {...props} />
    <span >{children}</span>
  </div>


  if (url != null) {
    return <a href={url}>{img}</a>
  }
  return img
}

