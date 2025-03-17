---
title: Helm
description: Recommended method for installing canary-checker
sidebar_class_name: hidden-mission-control
slug: /installation/helm
sidebar_custom_props:
  icon: helm
---

import Schema from '@site/modules/canary-checker/chart/values.schema.json'

# Quick Start

The recommended method for installing Canary Checker is using [helm](https://helm.sh/)

1. Install [canary-checker](https://github.com/flanksource/canary-checker) helm chart

   <Helm chart="canary-checker"
   schema={Schema}
   namespace="canary-checker"
   values={{
       "global.ui.host": "canary-checker.127.0.0.1.nip.io",
     }}
   />

   :::info
   Note the default installation of canary-checker uses an embedded postgres database and does not persist history, see: [Database](/installation/database)
   :::

1. Create a canary

   ```bash
   cat <<EOF | kubectl apply -f -
   apiVersion: canaries.flanksource.com/v1
   kind: Canary
   metadata:
     name: http-check
   spec:
     interval: 30
     http:
       - name: http pass response 200 status code
         url: https://httpbin.demo.aws.flanksource.com/status/200
   EOF
   ```

   <p></p>

1. Check the results via the [CLI](./cli)

  <TerminalOutput command="kubectl get canary" >
  NAME       INTERVAL     STATUS   LAST CHECK   UPTIME 1H       LATENCY 1H   LAST TRANSITIONED
  http-check   30         Passed   13s          18/18 (100.0%)   480ms        13s
  </TerminalOutput>

1. Access the dashboard

   You can access the web [dashboard](http://localhost:8080) by forwarding the port:

   <TerminalOutput command="kubectl  -n canary-checker port-forward  svc/canary-checker-ui 8080:80" >
   &nbsp;
   </TerminalOutput>

   <Screenshot img="/img/health-checks.png" shadow={false} alt="Canary Checker Dashboard"/>

   :::tip

   To deploy an ingress for the dashboard, update the `values.yaml`:

   ```yaml
   flanksource-ui:
     enabled: true
     ingress:
       annotations:
         kubernetes.io/tls-acme: 'true'
       host: <DOMAIN>
       tls:
         - hosts:
             - <DOMAIN>
           secretName: ingress-tls
   ```

   :::
