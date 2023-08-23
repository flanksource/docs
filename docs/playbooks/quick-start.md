# Quick Start

In this walkthrough, we'll create and run a playbook that scales a Kubernetes deployment.
The only prerequisites are

- you have a config item for a Kubernetes Deployment
- you have kubectl configured.

## 1. Create the playbook

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: scale-deployment
spec:
  description: Scale deployment
  configs:
    - type: Kubernetes::Deployment
      tags:
        namespace: default
        cluster: local-kind-cluster
  parameters:
    - name: replicas
      label: The new desired number of replicas.
  actions:
    - name: 'scale deployment'
      exec:
        script: kubectl scale --replicas={{.params.replicas}} deployment {{.config.name}}
```

This playbook is designed to run a configs of type `Kubernetes::Deployment` & having labels namespace: `default` & cluster: `local-kind-cluster`.
If you need, you can adjust the tags to your needs.

Save the above YAML to a file called `scale-deployment.yaml`. Then, to store the playbook, run:

```bash
kubectl apply -f scale-deployment.yaml
```

Please check the `playbooks` table in the database to see if the playbook has been created.

## 2. Run the playbook

To run the playbook, we need its id. In addition to that please get the id for the deployment config item that you want to scale.

```bash
curl -sL -X POST -u 'admin@local:admin' \
  --json '{
    "id": "<playbook_id>",
    "config_id": "<config_id>",
    "params": {
      "replicas": "1"
    }
  }' \
  localhost:8080/playbook/run
```

The above command scales the deployment of the given config item to just 1 replica. Since the playbook didn't have any approvers defined, the run starts immediately.

## 3. Get the run

At this stage, the run should have terminated successfully. We can check the status of the run by running:

```bash
curl -sL -X GET -u 'admin@local:admin' \
  localhost:8080/playbook/run/<run_id>
```

The run id is returned by the API call in the previous step.
