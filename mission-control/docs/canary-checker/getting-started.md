# Getting Started

1. Install canary checker:

  ```bash
  helm repo add flanksource https://flanksource.github.io/charts
  helm repo update
  helm install canary-checker flanksource/canary-checker -n "canary-checker"  --create-namespace
  ```

2. Create a new check

  ```yaml title="canary.yaml"
  apiVersion: canaries.flanksource.com/v1
  kind: Canary
  metadata:
    name: http-check
  spec:
    interval: 30
    http:
      - name: basic-check
        url: https://httpbin.demo.aws.flanksource.com/status/200
      - name: failing-check
        url: https://httpbin.demo.aws.flanksource.com/status/500
  ```

  And then apply it to the cluster:

  ```shell
  kubectl apply -f canary.yaml
  ```

  :::info
  You can also run the check locally to see its output by using the [cli](./cli)

  ```bash
  canary-checker run canary.yaml
  ```



3. Check the status of the health check:

  ```shell
  kubectl get canary
  ```



4. Check the Dashboard

![](./images/http-checks.png)

## Getting Help

If you have any questions about canary checker:

* Invite yourself to the [CNCF community slack](https://slack.cncf.io/) and join the [#canary-checker](https://cloud-native.slack.com/messages/canary-checker/) channel.
* Check out the [Youtube Playlist](https://www.youtube.com/playlist?list=PLz4F_KggvA58D6krlw433TNr8qMbu1aIU).
* File an [issue](https://github.com/flanksource/canary-checker/issues/new) - (We do provide user support via Github Issues, so don't worry  if your issue a real bug or not)
* [Flanksource](https://www.flanksource.com) provides both commercial support for canary checker and a SaaS offering called Mission Control.

Your feedback is always welcome!
