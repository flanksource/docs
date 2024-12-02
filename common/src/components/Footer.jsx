

function Footer() {
  return <div>

    <div className="text-gray-700 text-lg bg-slate-800" id="div-1">
      <div className="items-stretch border-b-2 flex-col justify-between pt-72 flex w-[85%] max-w-7xl pb-0 border-gray-700 border-solid m-auto" id="div-2">
        <div
          className="border-b-2 gap-x-[1.88rem] auto-cols-fr grid-rows-[auto] justify-between pb-8 gap-y-4 flex border-gray-700 border-solid"
          id="div-3"
          style={{
            gridTemplateAreas: '". Area"',
          }}>
          <a className="text-blue-700 inline-block h-auto max-w-full" href="https://www.flanksource.com/" id="a-1">
            <img className="cursor-pointer object-contain align-middle inline-block w-44 h-full max-w-full max-h-full" src="https://cdn.prod.website-files.com/62c72370a0f3f0f10d12b623/62dfd776960a6ec17dde933a_white_Logo%20.svg" />
          </a>
          <div className="items-center gap-x-[5.63rem] auto-cols-fr grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] grid-rows-[auto] gap-y-4 flex text-white" id="div-4">
            <a className="mb-3" href="https://www.flanksource.com/about">
              About
            </a>
            <a className="mb-3" href="https://www.flanksource.com/blog">
              Blog
            </a>
            <a className="mb-3" href="https://docs.flanksource.com/">
              Docs
            </a>
            <a className="mb-3" href="https://www.flanksource.com/careers">
              Careers
            </a>
            <a className="mb-3" href="https://www.flanksource.com/contact">
              Contact
            </a>
          </div>
        </div>
        <div className="text-white/[0.8] items-start justify-between py-8 flex" id="div-5">
          <div id="div-6">
            © All rights reserved.{" "}
            <a className="text-sky-400 inline-block mb-3" href="https://www.flanksource.com/" id="a-2">
              Flanksource Inc.
            </a>
          </div>
          <div className="gap-x-10 flex mr-16 ml-auto text-sm text-white/[0.5]" id="div-7">
            <a className="mb-3" href="https://www.flanksource.com/privacy">
              Privacy Policy
            </a>
            <a className="mb-3" href="https://www.flanksource.com/terms">
              Terms and Conditions
            </a>
          </div>
          <div className="items-center justify-start flex text-blue-700" id="div-8">
            <a className="items-center flex-col justify-center flex max-w-full mr-7" href="https://github.com/flanksource" id="a-3">
              <img className="cursor-pointer object-contain align-middle inline-block w-6 h-full max-w-full max-h-full" src="https://cdn.prod.website-files.com/62c72370a0f3f0f10d12b623/62dfe7cab83ee8f603eafb30_github.svg" />
            </a>
            <a className="items-center flex-col justify-center flex max-w-full mr-0" href="https://www.linkedin.com/company/flanksource/" id="a-4">
              <img className="cursor-pointer object-contain align-middle inline-block w-5 h-full max-w-full max-h-full" src="https://cdn.prod.website-files.com/62c72370a0f3f0f10d12b623/62c72370a0f3f03e0912b65f_Group%2027.svg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
}
