# Quick Start

Before installing the Canary Checker, please ensure you have the [prerequisites installed](docs/prereqs.md) on your Kubernetes cluster.

The recommended method for installing Canary Checker is using [helm](https://helm.sh/)

#### 1. Install Helm

The following steps will install the latest version of helm

```bash
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
```

#### 2. Add the Flanksource helm repository

```bash
helm repo add flanksource https://flanksource.github.io/charts
helm repo update
```

#### 3. Deploy using Helm

To install into a new `canary-checker` namespace, run

```bash
helm install canary-checker-demo \
	--wait \
	-n canary-checker \
	--create-namespace flanksource/canary-checker \
	-f values.yaml
```

```yaml title="values.yaml"
flanksource-ui:
  ingress:
    host: canary-checker.127.0.0.1.nip.io
    annotations:
      kubernetes.io/ingress.class: nginx
      kubernetes.io/tls-acme: "true"
    tls:
      - secretName: canary-checker-tls
        hosts:
        - canary-checker.127.0.0.1.nip.io
```


!!! note
    Note the default installation of canary-checker uses an embedded postgres database and does not persist history





## Database

To persistent history, canary-checker 3 options:

1. Mount a PVC/Hostpath volume for the embedded postgres database
2. Deploy a postgres pod
3. Connect to an external postgres database


#### Mounting a PVC for the Emebedded Database

```yaml title="values.yaml"
db:
	embedded:
		storageClass: # the name of a PV Storage Class
		stoage: 10Gi
# ...
```

**To connect to the embedded database:**

```shell
kubectl port-forward canary-checker-0 6432:6432
psql -U postgres localhost -p 6432 canary with password postgres #password will be postgres
```
### Deploying a postgres Pod

```yaml title="values.yaml"
db:
	external:
		enabled: true
		create: true # creates a new postgres statefulset
		storageClass: # the name of a PV Storage Class
		stoage: 10Gi
# ...
```


The helm chart will create a postgres server statefulset, with a random password and default port, along with a new database.

To specify a username and password for the chart-managed Postgres server, create a secret in the namespace that the chart will install to, named `postgres-connection`, which contains `POSTGRES_USER` and `POSTGRES_PASSWORD` keys.


### Connecting to an external db


In order to connect to an existing Postgres server, a database must be created on the server, along with a user that has administrator permissions for the database.git



```yaml file=values.yaml
db:
	external:
		enabled: true
		create: false
		secretKeyRef:
			name: postgres-connection #name of secret that contains a key containging the postgres connection URI
			key: POSTGRES_URL		 # name of the key in the secret that contains the postgres connection URI
# ...
```



## Flanksource UI

The canary checker itself only presents an API.  To view the data graphically, the Flanksource UI is required, and is installed by default. The UI should be configured to allow external access to via ingress

|                                    |                                                              |
| ---------------------------------- | ------------------------------------------------------------ |
| flanksource-ui.ingress.host        | URL at which the UI will be accessed                         |
| flanksource-ui.ingress.annotations | Map of annotations required by the ingress controller or certificate issuer |
| flanksource-ui.ingress.tls         | Map of configuration options for TLS                         |

More details regarding ingress configuration can be found in the [kubernetes documentation](https://kubernetes.io/docs/concepts/services-networking/ingress/)

|                           |                                                              |
| ------------------------- | ------------------------------------------------------------ |
| flanksource-ui.backendURL | Required to be set to the name of the canary-checker service.  The name will default to 'canary-checker' unless `nameOverride` is specified.  If `nameOverride is set, `backendURL` must be set to the same value |

Due to a limitation in Helm, there is no way to automatically propogate the generated service name to a child chart, and it must be aligned by the user.

###
