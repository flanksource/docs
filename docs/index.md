---
hide:
  - toc
---

<div align="center"> <img src="images/flanksource.svg" height="64px"></img></div>
---

### Welcome to the Flanksource Mission Control documentation page

Flanksource Mission Control is a platform that helps organizations improve their system visibility and incident management processes.

With its multi-dimensional approach and integrated incident lifecycle automation, Flanksource Mission Control empowers teams, executives, and vendors to coordinate and communicate more effectively.

Whether you are looking to improve your incident response times, better understand the root causes of issues, or simply want to improve communication and collaboration within your organization, Flanksource Mission Control has the tools you need to succeed.

## Incident Commander

The Incident Commander is a tool that is designed to help organizations manage and respond to emergencies, crises and other types of incidents. It is typically used by incident commanders, SRE and DevOps engineers to coordinate and communicate with other response team members, track the incident's status and make decisions about how to best manage the situation.

Incident commander includes features such as:

- A real-time map or dashboard showing the location and status of resources, including personnel, equipment and facilities.
- A messaging system for communication between the incident commander and other members of the response team.
- Tools for tracking and managing incident-related tasks, including assigning and prioritizing tasks, tracking progress and recording outcomes.
- Tools for tracking and monitoring health checks.
- Configuration tool that enables you to view and search the change history of your configuration across multiple dimensions (node, zone, environment, application, technology, etc).
- Integration with other systems such as; scrape data from network device in order to help incident commanders make informed decisions.

Incident commander installs two main components:

- Canary checker
- Config db

*NB: canary checker performs health checks on the system, while the Config DB keeps track of configuration changes should there be any modifications to the configuration in your Git repository.*

## Quick Start

How to Install Incident commander with helm

### Prerequisite

To properly install and run the Incident Commander chart on your Kubernetes Cluster, you need to have the following prerequisites;

- A Kubernetes installation of version 1.14 or higher.
- Config DB installed and running in your Kubernetes Cluster. See the [Config DB Helm installation guide](https://candid-bunny-c77dca.netlify.app/installation/config-db/tutorials/install-helm) for more information.

### Install Chart

```console
helm install [RELEASE_NAME] flanksource/incident-commander
```

To set custom values file for your incident-commander helm chart installation to override existing values in [`incident-commander-chart`](https://github.com/flanksource/incident-commander-chart/blob/main/chart/values.yaml).

```bash
cat > myvalues.yaml << EOT
canary-checker:
  debug: true
  db:
    enabled: true
    external:
      create: false
config-db:
  db:
    enabled: false
    external:
      create: false
flanksource-ui:
  ingress:
    enabled: true
    annotations:
      kubernetes.io/ingress.class: nginx
      kubernetes.io/tls-acme: "true"
    host: incident-commander.canary.lab.flanksource.com
    tls:
      - secretName: incident-commander-tls
        hosts:
          - incident-commander.canary.lab.flanksource.com
db:
  storageClass: gp2
  storage: 50Gi
EOT

helm install [RELEASE_NAME] -f myvalues.yaml flanksource/incident-commander
```

_See [configuration](#configuration) below._

_See [helm install](https://helm.sh/docs/helm/helm_install/) for command documentation._

### Uninstall Chart

```console
helm uninstall [RELEASE_NAME]
```

This removes all the Kubernetes components associated with the chart and deletes the release.

_See [helm uninstall](https://helm.sh/docs/helm/helm_uninstall/) for command documentation._

### Upgrading Chart

```console
helm upgrade [RELEASE_NAME] [CHART] --install
```

_See [helm upgrade](https://helm.sh/docs/helm/helm_upgrade/) for command documentation._

### Configuration

See [Customizing the Chart Before Installing](https://helm.sh/docs/intro/using_helm/#customizing-the-chart-before-installing). To see all configurable options with detailed comments, visit the chart's [values.yaml](https://github.com/flanksource/config-db/blob/main/chart/values.yaml), or run these configuration commands:

```console
helm show values flanksource/incident-commander
```

---

## Config DB

Config DB is an open source tool that allows developers to easily configure, scrape and manage data within their application.  It provides a user-friendly interface for setting up and managing database connections, as well as configuring tables and fields within the database. This tool can be particularly useful for developers who need to quickly set up a database for their application, without having to manually write complex SQL queries or code. It also allows for easy updates and changes to the database as the application evolves, making it a useful tool for maintaining a healthy and efficient database.

![Screen_Shot_2022-12-19_at_8.17.57_AM_kwkjql.png](https://res.cloudinary.com/dbm8wg3bn/image/upload/v1671528375/Screen_Shot_2022-12-19_at_8.17.57_AM_kwkjql.png)

## Canary Checker

Canary checker is an open source tool that allows users to monitor the status of their canaries (server monitoring tools) in real-time. Canary checker allows users to set up alerts for when their canaries go down or encounter any issues, giving them the ability to quickly respond and fix any potential problems before they become more significant. It also provides users with detailed logs and analytics of their canary activity, giving them valuable insights into the performance and reliability of their systems. Canary checker is an essential tool for anyone who relies on canaries for server monitoring and maintenance, helping them to ensure the stability and uptime of their systems.

One potential use of Canary Checker is, if you want to get the cert expiry dates for your URLs and get warn when we are X number of days from the expiry date.

![Screen_Shot_2022-12-19_at_8.17.39_AM_agdslp.png](https://res.cloudinary.com/dbm8wg3bn/image/upload/v1671528375/Screen_Shot_2022-12-19_at_8.17.57_AM_kwkjql.png)

With Incident Commander up and running, one can have a better understanding of their infrastructure, which helps in planning of disaster recovery and reducing downtime to the bearest minimum.
