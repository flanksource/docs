import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Screenshot({ img, size, shadow = true, alt }) {

  if (img.startsWith("/")) {
    img = img.substring(1);
  }
  if (shadow === true) {
    return <div className='rounded-8px mb-3  shadow-card card bg-lightest-gray border-0 border-t-8 border-white ml-auto mr-auto' style={{ width: size }}>
      <img src={require(`@site/static/${img}`).default} width={size} />
    </div>
  } else {
    return <div className='my-3  ml-auto mr-auto' style={{ width: size, flexDirection: "column", display: "flex" }}>

      <img src={require(`@site/static/${img}`).default} width={size} />
      <figcaption class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">{alt}</figcaption>

    </div>
  }
};



