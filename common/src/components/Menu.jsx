
import Icon from './Icon'


export function MenuItem({ name, icon, tags }) {


  return <div className="items-center text-gray-700 cursor-pointer font-medium text-sm  h-8  leading-5  px-2 text-center  inline-flex border-y-0 w-72 bg-white font-sans" role="menuitem">
    <Icon name={icon} />
    {name}
  </div>
}

export default function Menu({ name, items, rows, ...props }) {
  return <div className="mx-auto">

    <div className="flex flex-col  ">

      <div className="relative inline-block text-left pb-2">
        <button className="btn-white bg-white rounded-md border border-gray-300 inline-flex items-center justify-center rounded-md border  px-4 py-2 text-sm text-gray-700  hover:bg-gray-100   font-sans font-semibold focus:outline-none">
          {" "}

          <Icon name="playbook" className="h-5" />

          Playbooks
          <svg className="text-gray-400 w-5 h-5 -mr-1 ml-2" fill="rgb(156, 163, 175)" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" fill="rgb(156, 163, 175)" fillRule="evenodd" />
          </svg>
        </button>
      </div>



      <div className="text-left rounded-md  shadow" style={{ "width": "300px" }}>

        <div className=" mt-2 w-56 origin-top-right divide-y divide-gray-100   font-medium rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu">
          <div className="py-1 flex flex-col" role="none">
            {items.map((element, i) => {
              return <MenuItem name={element.name} icon={element.icon} key={i} />
            })}
          </div>
        </div>
      </div>

    </div>

  </div>
}

