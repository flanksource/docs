import CodeBlock from '@theme/CodeBlock'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';
import { useState, useRef } from "react"


function generateCli(
  repo,
  repoName,
  chart,
  namespace,
  createNamespace,
  createRepo,
  wait,
  values,
  valueFile,
  args
) {

  var s = ""
  if (valueFile) {
    s += 'cat > values.yaml << EOF\n' + valueFile + `\nEOF\n\n`
  }


  if (createRepo) {
    s += `helm repo add ${repoName} ${repo} \nhelm repo update\n`
  }
  s += `helm install ${chart} ${repoName}/${chart} \\\n`
  Object.keys(values).forEach((k) => {
    s += ` --set ${k}=${values[k]} \\\n`
  })
  if (valueFile) {
    s += " --set-file values.yaml \\\n"
  }

  s += ` -n ${namespace}`
  if (createNamespace) {
    s += " --create-namespace \\\n"
  }
  if (args) {
    s += args.map(i => ` ${i} \\\n`)
  }
  if (wait) {
    s += " --wait \n"
  }
  return s

}

export default function Helm({
  repo = "https://flanksource.github.io/charts",
  repoName = "flanksource",
  chart = "mission-control",
  namespace = "mission-control",
  createNamespace = true,
  createRepo = true,
  wait = true,
  values = {},
  valueFile = null,
  args = [],
  properties = null
}) {

  const bash = useRef(null)
  const [state, setState] = useState(values)
  const [cli, setCli] = useState(generateCli(
    repo, repoName, chart, namespace, createNamespace, createRepo, wait, state, valueFile, args))

  return <>

    {/* <form>


      {state && Object.keys(state).map((k) => {
        return <>      <div className='flex flex-row space-x-2'>
          <label htmlFor={k} className=" my-auto  text-sm font-medium leading-6 text-gray-900">
            {k}
          </label>
          <input
            type="text"
            name={k}
            id={k}
            style={{
              width: "320px",
              border: "1px solid #d8dbdf",
              boxShadow: "rgb(255, 255, 255) 0px 0px 0px 0px inset, rgb(209, 213, 219) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px"
            }}
            className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            placeholder={state[k]}
            onChange={e => {
              // window.button = e.target
              // window.findParent = findParent
              // console.log(e.target, findParent(e.target, 'form'))
              // let elements = document.evaluate(`//span[contains(text(), "${k}")]`, button.parentNode.parentNode.nextSibling, null,
              //   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

              // if (elements.snapshotLength > 0) {
              //   let placeholder = elements.snapshotItem(0).nextSibling.nextSibling
              //   console.log(placeholder, e.target.value, placeholder.value)
              //   placeholder.textContent = e.target.value
              // } else {
              //   console.error("node not found");
              // }

              state[k] = e.target.value


              let code = generateCli(
                repo, repoName, chart, namespace, createNamespace, createRepo, wait, state, args)
              console.log(bash.current)

              debugger;
              // bash.current.children = code

            }}
          />
        </div>
        </>
      })}
    </form> */}

    <Tabs>

      <TabItem value="helm" label="Helm">
        <CodeBlock language="bash">
          {cli}
        </CodeBlock>

      </TabItem>



      <TabItem value="flux" label="Flux" default>
        <CodeBlock language="yaml">
          {createNamespace && `apiVersion: v1
kind: Namespace
metadata:
  name: ${namespace}
---
`}
          {createRepo && `apiVersion: source.toolkit.fluxcd.io/v1beta1
kind: HelmRepository
metadata:
  name: ${repoName}
  namespace: ${namespace}
spec:
  interval: 5m0s
  url: ${repo}
---
`}
          {`apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: ${chart}
  namespace: ${namespace}
spec:
  chart:
    spec:
      chart: ${chart}
      sourceRef:
        kind: HelmRepository
        name: ${repoName}
        namespace: ${namespace}
      interval: 1m
  values:
  `}
          {valueFile && valueFile.replace(/^/gm, '   ')}
          {values && Object.keys(values).map((k) => {
            return `\n   ${k}: ${values[k]}`
          }).join("")}
        </CodeBlock>
      </TabItem>
    </Tabs >

    {(chart == "mission-control" || chart == "mission-control-agent") &&

      <>See < Link to={`/reference/helm/${chart}`}>values.yaml</Link ></>

    }

  </>

}
