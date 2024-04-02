

export default function ShadowBox({ img, size }) {
  return <div className='rounded-8px mb-3 mr-3 shadow-card card bg-lightest-gray border-0 border-t-8 border-white' style={{ width: size }}>
    <img src={img} width={size} />
  </div>

};



