import React from 'react';

export function Asciinema({ id, width = "940px", code }) {
  return (
    <>
      <iframe src={`https://asciinema.org/a/${id}/iframe?theme=dracula`} id={`asciicast-iframe-${id}`} name={`asciicast-iframe-${id}`} scrolling="no" allowFullScreen="true" width={width} style={{ marginTop: "5px" }} >
      </iframe >
    </>
  );
}

