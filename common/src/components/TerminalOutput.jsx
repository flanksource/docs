
import Convert from 'ansi-to-html'

import CopyButton from '@theme/CodeBlock/CopyButton'


function ansi2HTML(str, command) {

  const wrapTextInSpan = (node) => {
    if (typeof window === 'undefined') {
      return str; // Return original string if not in browser environment
    }

    if (node.nodeType === 3) { // Text node
      const span = document.createElement('span');
      span.textContent = node.textContent;
      span.style.color = 'white'; // Set text color to white
      // span.className = 'text-white'; // Add Tailwind CSS class for whitespace preservation
      node.parentNode.replaceChild(span, node);
    } else if (node.nodeType === 1) { // Element node
      [...node.childNodes].forEach(wrapTextInSpan);
    }
  };

  if (typeof window === 'undefined') {
    return str;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString("", 'text/html');
  wrapTextInSpan(doc.body);
  doc.body.innerHTML = `<span class="text-gray-500">&gt;${cmd} </span><br>` + doc.body.innerHTML
  console.log("inner", doc.body.innerHTML)
  return doc.body.innerHTML.replaceAll("\n", "<br/>");
}


export default function Ansi({ command, children }) {

  let txt = `[92m❯[0m [37m${command}[0m<br/>` + children.props.children.replaceAll("\n", "<br/>")

  let html = new Convert().toHtml(txt, command)
  return (
    <div style={{
      backgroundColor: '#2D2D2D',
      borderRadius: '6px',
      padding: '1px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      <div style={{
        height: '28px',
        background: 'linear-gradient(to bottom, #4B4B4B, #3A3A3A)',
        borderTopLeftRadius: '6px',
        borderTopRightRadius: '6px',
        padding: '0 8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '6px'
      }}>
        <div
          style={{
            boxSizing: "border-box",
            color: "rgb(137, 137, 144)",
            columnGap: "8px",
            display: "grid",
            gridAutoFlow: "column",
            gridTemplateColumns: "12px 12px 12px",
            gridTemplateRows: "12px",
            height: "28px",
            justifyContent: "flex-start",
            lineHeight: "24px",
            paddingTop: "0.5rem",
            width: "62px",
          }}>
          <div
            style={{
              backgroundColor: "rgb(236, 106, 94)",
              borderRadius: "10000px",
              height: "0.75rem",
              width: "0.75rem",
            }}
          />
          <div
            style={{
              backgroundColor: "rgb(243, 191, 79)",
              borderRadius: "10000px",
              height: "0.75rem",
              width: "0.75rem",
            }}
          />
          <div
            style={{
              backgroundColor: "rgb(97, 197, 84)",
              borderRadius: "10000px",
              height: "0.75rem",
              width: "0.75rem",
            }}
          />
        </div>

        {/*FIXME: why does the button render outside?*/}
        <div className='display-block mb-6 mr-[15px]'><CopyButton code={command} className="text-white/[0.5] hover:text-white" /></div>

      </div>
      <div
        className='tailwind-reset bg-black  p-2 text-sm  max-h-[200px] '
        style={{
          display: "block",
          color: 'white',
          whiteSpace: 'pre',
          maxHeight: '200px',
          fontFamily: 'monospace',
          overflow: "auto"
        }}
        dangerouslySetInnerHTML={{
          __html: html
        }} />
    </div>
  );
}
