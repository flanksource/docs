import React from "react";
export default function Icon({ name, height = "32px", className }) {
  return (
    <img
      src={`/img/icons/${name}.svg`}
      style={{ height: { height } }}
      className={className}
    />
  );
}
