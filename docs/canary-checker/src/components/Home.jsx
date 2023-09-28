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
      // <Hero
      //   id="hero"
      //   align="left"

      //   title={
      //     <img src={Logo} />
      //   }
      //   subtitle={
      //     <span className="hero-title text-3xl leading-9 font-extrabold md:text-3xl lg:text-3xl md:leading-10  inline-block">
      //       Kubernetes Native Synthetic Testing Platform
      //     </span>
      //   }
      //   image={"/img/canary.png"


      //   }

      //      background="graphBlueLine"
      //   cta={[
      //     <a href="#" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>,
      //   ]}
      // />
      <div className="relative isolate overflow-hidden bg-white hero-pattern">

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <img
              className="h-11"
              src="/img/canary-checker.svg"
              alt="Canary Checker"
            />
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Kubernetes Native Synthetic Testing Platform
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
                  alt="App screenshot"
                  className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
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

        {/* How it works */}
        {/* <div className="diagonal-box py-16 bg-gray-200 overflow-hidden">
          <div className="diagonal-content max-w-xl mx-auto px-4 md:px-6 lg:px-8 lg:max-w-screen-xl">
            <div className="max-w-screen-xl mx-auto pt-6 px-4 md:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl leading-9 font-extrabold text-gray-900 md:text-4xl md:leading-10">
                  How it works
                </h2>
                <p className="mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto">
                  We scrape your documentation or technical blog, configure the
                  Algolia application and send you the snippet you'll have to
                  integrate. It's that simple.
                </p>
              </div>
            </div>

            <div className="py-16">
              <div className="max-w-xl mx-auto px-4 md:px-6 lg:max-w-screen-lg lg:px-8 ">
                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                  <div>
                    <div className="flex items-center justify-center">
                      <img
                        className="h-200"
                        src={withBaseUrl('img/assets/scraping.svg')}
                        width="190px"
                        height="220px"
                        alt="Scraping with Algolia Crawler"
                      />
                    </div>
                    <div className="mt-10 lg:mt-0 p-4">
                      <h5 className="text-lg leading-6 font-medium text-gray-900">
                        1. Scraping
                      </h5>
                      <p className="mt-2 text-base leading-6 text-gray-600">
                        We leverage the{' '}
                        <InlineLink
                          target="_blank"
                          href="https://www.algolia.com/products/search-and-discovery/crawler/"
                        >
                          Algolia Crawler
                        </InlineLink>{' '}
                        to index every section of your website.
                      </p>
                    </div>
                  </div>
                  <div className="mt-10 lg:mt-0 p-4">
                    <div className="h-200 flex items-center justify-center">
                      <img
                        src={withBaseUrl('img/assets/configuration.svg')}
                        width="140px"
                        height="220px"
                        alt="Configuration of your crawler"
                      />
                    </div>
                    <div>
                      <h5 className="text-lg leading-6 font-medium text-gray-900">
                        2. Configuration
                      </h5>
                      <p className="mt-2 text-base leading-6 text-gray-600">
                        You don't need to configure any settings or even have an
                        Algolia account. We take care of this for you!
                      </p>
                    </div>
                  </div>
                  <div className="mt-10 lg:mt-0 p-4">
                    <div className="h-200 flex items-center justify-center">
                      <img
                        src={withBaseUrl('img/assets/implementation.svg')}
                        width="220px"
                        height="220px"
                        alt="Implementation on your website"
                      />
                    </div>
                    <div>
                      <h5 className="text-lg leading-6 font-medium text-gray-900">
                        3. Implementation
                      </h5>
                      <p className="mt-2 text-base leading-6 text-gray-600">
                        We'll send you a small snippet to integrate DocSearch to
                        your website and an invite to your fully configured
                        Algolia application.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <Feature
          subtitle="Integrations"
          title="Batteries included with 30+ check types"
          image={<Integrations />}
          url="https://canarychecker.io/checks">
          Canary checker is a single binary with most checks bundled and not requiring an external installation.

        </Feature>

        <Feature
          subtitle="Kubernetes Native"
          title="Health Checks as Code"
          left={false}
          image="canary.png"
          url="https://canarychecker.io/getting-started">
          Canaries are regular Kubernetes Custom Resource Definitions with conformant status conditions, making it suitable to use as <a href="https://fluxcd.io/flux/components/kustomize/kustomizations/#health-checks" target="_blank">Flux</a>, <a href="https://helm.sh/docs/topics/charts_hooks/" target="_blank">Helm Hook</a>, or <a target="_blank" href="https://argo-cd.readthedocs.io/en/stable/operator-manual/health/#custom-health-checks">Argo</a> health checks.
        </Feature>


        <Feature
          subtitle="Secret Management"

          title="Leverage Kubernetes Secrets"
          image="auth-check.png"
          url="https://canarychecker.io/concepts/authentication">
          Canaries are namespace aware and can be configured to use kubernetes secrets and configmaps for authentication details, negating the need to store secrets in the configuration.
        </Feature>


        <Feature
          subtitle="Escape Hatch"
          title="Fallback to shell scripts"
          left={false}
          image="exec-check.png"
          url="https://canarychecker.io/reference/exec">
          When the builtin integrations are not enough, run scripts using bash or powershell.
          <div>
            <Icon name="bash" />     <Icon name="powershell" /></div>
        </Feature>



        <Feature
          subtitle="Escape Hatch"
          title="Scripting"

          image="exec-check.png"
          url="https://canarychecker.io/concepts/scripting">
          Evaluate the health of checks using scripts in CEL, Javascript or Go Templating. Templates can also be used to format the output of checks.
          <div>
            <Icon name="cel" />     <Icon name="javascript" /> <Icon name="go" />
          </div>
        </Feature>

        <Feature
          subtitle="Context"
          title="Display Formatted Output"
          left={false}

          image="exec-check.png"
          url="https://canarychecker.io/concepts/scripting">
          Evaluate the health of checks using scripts in CEL, Javascript or Go Templating. Templates can also be used to format the output of checks.
          <div >
            <Icon name="cel" />     <Icon name="javascript" /> <Icon name="go" />
          </div>
        </Feature>

        <Feature
          subtitle="Dashboards"
          title="Grafana"
          image="grafana-dashboard.png"
          url="https://github.com/flanksource/canary-checker/tree/master/chart/dashboards">
          Chose from a standard <a href="https://github.com/flanksource/canary-checker/tree/master/chart/dashboards" target="_blank">Grafana dashboard</a> or create your own using the prometheus metrics exposed by Canary Checker.
        </Feature>


        <Feature
          subtitle="prometheus"
          title="Custom Metrics"
          image="exec-check.png"
          left={false}
          url="https://canarychecker.io/concepts/scripting">
          Evaluate the health of checks using scripts in CEL, Javascript or Go Templating. Templates can also be used to format the output of checks.
          <div >
            <Icon name="cel" />     <Icon name="javascript" /> <Icon name="go" />
          </div>
        </Feature>



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
