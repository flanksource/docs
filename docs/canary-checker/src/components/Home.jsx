import { useColorMode } from '@docusaurus/theme-common';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import React from 'react';
import Icon from './Icon';
import { Feature } from './Feature';
import { Integrations } from './Integrations';



function Home() {
  const { withBaseUrl } = useBaseUrlUtils();
  const { colorMode } = useColorMode();

  React.useEffect(() => {
    if (colorMode === 'dark') {
      document.querySelector('html').classList.add('dark');
    } else {
      document.querySelector('html').classList.remove('dark');
    }
  }, [colorMode]);

  function Header() {
    return (

      <>
        <div className="relative isolate overflow-hidden bg-white hero-pattern">

          <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
              <img
                className="h-11"
                src="/img/canary-checker.svg"
                alt="Canary Checker"
              />
              <h1 className="mt-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Kubernetes Native <br></br> Health Check Platform
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">

              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href="/getting-started"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a>

              </div>
            </div>
            <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
              <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2  lg:-m-4 lg:rounded-2xl lg:p-4" >
                  <img
                    src="/img/canary-ui.png"
                    alt="canary checker"
                    className="w-[60rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  function Description() {
    return (
      <>


        {/* Description */}
        <div className="py-16 overflow-hidden">
          <div className="relative max-w-xl mx-auto px-4 md:px-6 lg:px-8 lg:max-w-screen-xl">
            <div className="relative">
              <h3 className="text-center text-3xl leading-8 font-extrabold tracking-tight md:text-4xl md:leading-10">
                A single pane of glass for health across your stack.
              </h3>
              <p className="mt-4 max-w-3xl mx-auto text-center text-xl leading-7 text-description">
                Aggregate alerts, run synthetic checks / tests against your services and infrastructure.
              </p>
            </div>

            <div className="pt-16">
              <ul className="lg:grid lg:grid-cols-3 lg:col-gap-8 lg:row-gap-10">
                <li>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md  text-white">
                        <Icon name="console" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg leading-6 font-medium">
                        Synthetic (Active) Checks
                      </h4>
                      <p className="mt-2 text-base leading-6 text-description">
                        Generate synthetic traffic, run queries against various datasources, or even run full integration test suites to verify the health of your services and infrastructure.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="mt-10 lg:mt-0">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md text-white">
                        <Icon name="passive-check" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg leading-6 font-medium">
                        Passive Checks
                      </h4>
                      <p className="mt-2 text-base leading-6 text-description">
                        Consolidate alerts across your monitoring stack and create alerts from non-traditional sources like SQL, NoSQL and CI/CD pipelines.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="mt-10 lg:mt-0">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md text-white">
                        <Icon name="kubernetes" /> <Icon name="aws" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg leading-6 font-medium">
                        Infrastructure
                      </h4>
                      <p className="mt-2 text-base leading-6 text-description">
                        Batteries including support for HTTP, DNS, ICMP, LDAP, Prometheus, SQL, Mongo, Redis, Github, Azure Devops, JMeter, K6, Playwright, Newman/Postman, SMB, SFTP,
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>



        <Feature
          subtitle="Integrations"
          title="Batteries included with 30+ check types"
          image={<Integrations />}
          url="/checks">
          Canary checker is a single binary with most checks bundled and not requiring an external installation.

        </Feature>

        <Feature
          subtitle="Kubernetes Native"
          title="Health Checks as Code"
          left={false}
          image="canary.png"
          url="/getting-started">
          Canaries are regular Kubernetes Custom Resource Definitions with conformant status conditions, making it suitable to use as Flux, ArgoCD or Helm health check.
          <div>
            <Icon name="helm" url="https://helm.sh/docs/topics/charts_hooks/" />
            <Icon name="flux" url="https://fluxcd.io/flux/components/kustomize/kustomizations/#health-checks" />
            <Icon name="argo" url="https://argo-cd.readthedocs.io/en/stable/operator-manual/health/#custom-health-checks" />
          </div >
        </Feature >


        <Feature
          subtitle="Prometheus"
          title="Metrics Exporter"
          image="metrics-exporter.png"
          url="/concepts/metrics-exporter">
          Export custom metrics from any check, replacing the need for multiple separate metric exporters.
        </Feature>

        <Feature
          subtitle="Dashboards"
          title="Grafana"
          left={false}
          image="grafana-dashboard.png"
          url="/concepts/grafana">
          Chose from a standard <a href="https://github.com/flanksource/canary-checker/tree/master/chart/dashboards" target="_blank">Grafana dashboard</a> or create your own using the prometheus metrics exposed by Canary Checker.
        </Feature>



        <div className='bg-gray-100'>
          <div class="mx-auto max-w-7xl py-12 sm:px-6 sm:py-16 lg:px-8">
            <div class="relative isolate overflow-hidden px-6 py-12 text-center shadow-2xl sm:rounded-3xl sm:px-16">
              <h2 class="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">100% Open Source</h2>

              <p class="mt-6 text-lg leading-8 text-gray-600">
                Canary checker is 100% open source under the Apache 2.0 license. We welcome contributions from our awesome community.
                <div>
                  <img alt="GitHub" src="https://img.shields.io/github/license/flanksource/canary-checker?style=for-the-badge" />
                  <img className="pl-2" alt="GitHub Repo stars" src="https://img.shields.io/github/stars/flanksource/canary-checker?style=for-the-badge" />
                  <img className="pl-2" alt="GitHub contributors" src="https://img.shields.io/github/contributors/flanksource/canary-checker?style=for-the-badge" />

                  <img className="pl-2" alt="Docker Pulls" src="https://img.shields.io/docker/pulls/flanksource/canary-checker?style=for-the-badge" />

                  <img className="pl-2" alt="GitHub closed pull requests" src="https://img.shields.io/github/issues-pr-closed-raw/flanksource/canary-checker?style=for-the-badge&label=Merged%20PR's&color=%2339c632" />




                </div>
              </p>

              <div class="mt-10 flex items-center justify-center gap-x-6">

                <a href="https://github.com/flanksource/canary-checker/graphs/contributors">
                  <img src="https://contrib.rocks/image?repo=flanksource/canary-checker" />
                </a>


              </div>
            </div>
          </div>
        </div>

        <Feature
          subtitle="Context"
          title="Display Formatted Output"


          image="display-format.png"
          url="/concepts/display-formatting">
          Evaluate the health of checks using scripts in CEL, Javascript or Go Templating. Templates can also be used to format the output of checks.
          <div >
            <Icon name="cel" />     <Icon name="javascript" /> <Icon name="go" />
          </div>
        </Feature>


        <Feature
          subtitle="Escape Hatch"
          title="Fallback to shell scripts"
          left={false}
          image="exec-check.png"
          url="/reference/exec">
          When the builtin integrations are not enough, run scripts using bash or powershell.
          <div>
            <Icon name="bash" />     <Icon name="powershell" /></div>
        </Feature>

        <Feature
          subtitle="Control Plane Monitoring"
          title="Active Infrastructure Checks"
          image="infrastructure-check.png"
          url="/concepts/scripting">
          Proactive infrastructure checks ensure your control plane has ample buffer/ or capacity. These checks validate the ability to schedule new pods, launch EC2 instances, and  push/pull to docker and helm repositories.
          <div className='pt-2' >
            <Icon name="k8s" url="/reference/pod" />
            <Icon name="aws-ec2-instance" url="/reference/ec2" />
            <Icon name="s3" url="/reference/s3-protocol" />
            <Icon name="docker" url="/reference/containerd" />
            <Icon name="helm" url="/reference/helm" />
          </div>
        </Feature>



        <Feature
          subtitle="Escape Hatch"
          title="Scripting"
          left={false}

          image="exec-check.png"
          url="/concepts/scripting">
          Evaluate the health of checks using scripts in CEL, Javascript or Go Templating. Templates can also be used to format the output of checks.
          <div>
            <Icon name="cel" />     <Icon name="javascript" /> <Icon name="go" />
          </div>
        </Feature>






        <Feature
          subtitle="Secret Management"

          title="Leverage Kubernetes Secrets"
          image="auth-check.png"
          url="/concepts/authentication">
          Canaries are namespace aware and can be configured to use kubernetes secrets and configmaps for authentication details, negating the need to store secrets in the configuration.
        </Feature>






        <div class="py-12 sm:py-16" style={{ backgroundColor: "#f7f9ff" }}>
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 sm:gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <div>
                <h2 className="text-base font-semibold leading-7 text-indigo-600 uppercase">Support</h2>
                <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  <img className="h-16" src="/img/mission-control-logo.svg" />
                </p>
                <p class="mt-6 text-base leading-7 text-gray-600">Support for Canary Checker is available as part of the Flanksource Mission Control Internal Developer Platform

                  <div className="py-6">
                    <a
                      href="https://www.flanksource.com/"
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Learn More
                    </a>
                  </div>
                </p>
              </div>
              <dl class="col-span-2 grid grid-cols-1 gap-x-8 gap-y-6 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-10">
                <div class="relative pl-9">
                  <dt class="font-semibold text-gray-900">
                    <svg class="absolute left-0 top-1 h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                    </svg>
                    SaaS
                  </dt>
                  <dd class="mt-2">Hosted Platform on either AWS or Azure</dd>
                </div>
                <div class="relative pl-9">
                  <dt class="font-semibold text-gray-900">
                    <svg class="absolute left-0 top-1 h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                    </svg>
                    On Premise
                  </dt>
                  <dd class="mt-2">Run inside your own data center or Bring Your Own Cloud</dd>
                </div>
                <div class="relative pl-9">
                  <dt class="font-semibold text-gray-900">
                    <svg class="absolute left-0 top-1 h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                    </svg>
                    Resource Catalog & Change Tracking
                  </dt>
                  <dd class="mt-2">Track both application and infrastructure resources across multiple clouds. </dd>
                </div>
                <div class="relative pl-9">
                  <dt class="font-semibold text-gray-900">
                    <svg class="absolute left-0 top-1 h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                    </svg>
                    Playbooks
                  </dt>
                  <dd class="mt-2">Run automated playbooks based on canary checker health changes</dd>
                </div>
                <div class="relative pl-9">
                  <dt class="font-semibold text-gray-900">
                    <svg class="absolute left-0 top-1 h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                    </svg>
                    Notifications
                  </dt>
                  <dd class="mt-2">Send notifications to 10+ different targets when canaries fail</dd>
                </div>
                <div class="relative pl-9">
                  <dt class="font-semibold text-gray-900">
                    <svg class="absolute left-0 top-1 h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                    </svg>
                    Topology
                  </dt>
                  <dd class="mt-2">Map your complex system in multiple dimensions </dd>
                </div>

              </dl>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div id="tailwind">
      <Header />
      <Description />
    </div>
  );
}

export default Home;
