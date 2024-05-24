

export default function Screenshot({ img, size, shadow = true }) {
  if (shadow) {
    return <div className='rounded-8px mb-3  shadow-card card bg-lightest-gray border-0 border-t-8 border-white ml-auto mr-auto' style={{ width: size }}>
      <img src={img} width={size} />
    </div>
  } else {
    return <div className='mb-3 ml-auto mr-auto' style={{ width: size }}>
      <img src={img} width={size} />
    </div>
  }

};



