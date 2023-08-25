import React from "react";
export default function Icon({ name, height = "32px" }) {
  return (
    <img
      src={`/img/icons/${name}.svg`}
      style={{ height: { height } }}
    />
  );
}
