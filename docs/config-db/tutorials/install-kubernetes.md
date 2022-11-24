# How to Deploy ConfigDB to Kubernetes
ConfigDB is a configuration management database (CMDB) built with developers in mind. It allows you to continuously scrape configurations from a variety of sources and traverse those configurations through a simple, searchable JSON tree.
In this tutorial, you will learn how to install and deploy ConfigDB to a Kubernetes environment using manual YAML configurations. 

## Prerequisites
This tutorial will be a hands on demonstration. To follow along, be sure to have the following:

- A kubernetes cluster or local Kubernetes environment, such as Kind, Microk8s, Minikube.
- Kubectl installed in your local machine.
- A client environment such as Ubuntu, MacOS, or Windows. 

!!! info "Related"
    To install Config-db using a helm chart, see the [Installation](/installation/#config-db) guide for more info.

## Deploying ConfigDB to Kubernetes Manually 
The advantage of deploying ConfigDB to Kubernetes manually is that it gives you a more in-depth understanding of application deployment on the Kubernetes environment.
You’ll create some Kubernetes resources required to manually deploy ConfigDB to Kubernetes.
Before you commence deploying ConfigDB to Kubernetes, a Postgres database is required. See the following tutorial for the [installation process](https://phoenixnap.com/kb/postgresql-kubernetes).
With a Postgres database installed, you can go ahead to deploying Config-db to Kubernetes.

- For Config-db to work properly it needs to have access to the already created Postgres database to perform migrations. Create a Secret configuration containing your Postgres database connection string. 
    ```bash
    $ kubectl create secret generic postgres-conn-string \
    --from-literal=conn-string="postgres://{user}:{password}@{hostname}:{port}/{database-name}"
    ```

- Create a deployment YAML file, `config-db-deployment.yaml`. This deployment file contains configurations of the Config-db deployment and provides specifications for the container such as command, arguments, environment values, and resource specifications.

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: config-db
    spec:
      selector:
        matchLabels:
          app: config-db
      template:
        metadata:
          labels:
            app: config-db
        spec:
          containers:
            - name: config-db
              image: docker.io/flanksource/config-db:latest
              command:
                - /app/config-db
              args:
                - serve
                - -vvv
              env:
                - name: DB_URL
                  valueFrom:
                    secretKeyRef:
                      name: postgres-conn-string
                      key: conn-string
              resources:
                requests:
                  cpu: 200m
                  memory: 200Mi
                limits:
                  memory: 512Mi
                  cpu: 500m
    ```
    Save the configuration file. Apply the configuration to your cluster with the following command:
    ```bash
    $ kubectl apply -f config-db-deployment.yaml
    ```
    Once done, you should get the following output:
    ```console
    deployment.apps/config-db created
    ```

- To use Config-db it needs to be accessble so as to interact with the API to monitor configuration changes and other perform other operations. To do this, a Kubernetes Service resource is required. 
Create a file called `config-db-service.yaml`, add the following configurations to the file and save:

    ```yaml
    apiVersion: v1
    kind: Service
    metadata:
      name: config-db
    spec:
      selector:
        app: config-db
      ports:
        - port: 8080
          protocol: TCP
          targetPort: 8080
    ```
    Once the file is saved, apply the configuration with the following command:

    ```bash
    $ kubectl apply -f config-db-service.yaml
    ```
    Once successfully applied, you should get the following output:

    ```console
    service/config-db created
    ```
    
- To confirm if everything is working as expected, check the logs in the pod with the `kubectl logs` command:
    ```bash
    kubectl logs <config-db-xxxxxxxx>
    ```
    You should get a similar output:
    ```console
      / __/___/ /  ___
     / _// __/ _ \/ _ \
    /___/\__/_//_/\___/ v4.6.3
    High performance, minimalist Go web framework
    https://echo.labstack.com
    ____________________________________O/_______
                                        O\
    ⇨ http server started on [::]:8080
    time="2022-11-19T09:27:12Z" level=info msg=Exec args="[]" commandTag= fields.time="96.731µs" pid=1995 sql=";"
    time=2022-11-19T09:27:12Z level=debug msg=/app/.bin/postgrest already exists
    time=2022-11-19T09:27:12Z level=trace msg=exec: PGRST_ADMIN_SERVER_PORT=3001 PGRST_DB_ANON_ROLE=postgrest_api PGRST_DB_URI=postgres://<username>:<password>@<host>:<port>/<db_name> PGRST_DB_SCHEMA=public PGRST_OPENAPI_SERVER_PROXY_URI=http://localhost:8080/db PGRST_DB_PORT=3000 PGRST_LOG_LEVEL=warn  /app/.bin/postgrest 

    19/Nov/2022:09:27:12 +0000: Attempting to connect to the database...
    19/Nov/2022:09:27:12 +0000: Admin server listening on port 3001
    19/Nov/2022:09:27:12 +0000: Listening on port 3000
    19/Nov/2022:09:27:12 +0000: Connection successful
    19/Nov/2022:09:27:12 +0000: Config reloaded
    19/Nov/2022:09:27:12 +0000: Listening for notifications on the pgrst channel
    19/Nov/2022:09:27:12 +0000: Schema cache loaded
    ```

- Once the  `config-db` installation is confirmed and running as expected, you can go ahead to create a simple configuration to scrape your sample configuration from a Git repository. Create a file called `scrape-git-config.yaml` and attach the following code snippet:
  ```yaml
  file:
    - type: $.kind
      id: $.metadata.name
      url: github.com/joeshiett/sample-configuration
      paths:
        - sample-config.yaml
  ```

  The supported values for the `type` and `id` field is the JSONPath. The `type` field specifies the `type` of the configuration which is `Canary`, the `id` field specifies the `name` of the configuration. The `url` field specifies the git repository containing the configuration to be scraped. The `paths` field specifies configuration file to be scraped in this case which is `sample-config.yaml`. For this example, the configuration is contained in a repository called `sample-configuration`.
  The file `sample-config.yaml` looks like this:
  ```yaml
  apiVersion: canaries.flanksource.com/v1
  kind: Canary
  metadata:
    name: http-check
  spec:
    interval: 30
    http:
      - endpoint: http://status.savanttools.com/?code=200
        thresholdMillis: 3000
        responseCodes: [201, 200, 301]
        responseContent: ""
        maxSSLExpiry: 7
  ```
- To scrape your configuration at once, perform the following command:
  ```bash
  # Copy scrape-git-config.yaml to Config-db pod
  kubectl cp scrape-git-config.yaml <config-db-pod-name>:config/scrape-git-config.yaml

  # Install git in the Pod, and run scrape-git-config.yaml configuration
  kubectl exec -it <config-db-pod-name> -- /bin/bash -c "apt install -y git && ./config-db run config/scrape-git-config.yaml"
  ```
  To confirm the `scrape-git-config.yaml` configuration has run properly, you should get the following output:
  ```console
  INFO[0000] Loaded 7 config rules
  INFO[0000] Loaded 1 change rules
  2022-11-22T20:47:24.400Z	INFO	Scrapping [scrape-gi-config.yaml]
  2022-11-22T20:47:24.413Z	INFO	Initialized DB: 10.42.0.11:5432/config_db (8045 kB)
  2022/11/22 20:47:24 goose: no migrations to run. current version: 99
  2022-11-22T20:47:24.446Z	INFO	Scraping files from (PWD: /app)
  2022-11-22T20:47:25.232Z	INFO	Exporting 1 resources to DB
  ``` 

- Now you've been able to scrape your configuration. To confirm the configuration is scraped and added to Config-db, you need to query the Config-db API. You can do so by performing the following commands:
  ```bash
  ## This command extracts the endpoint for the config-db service
  export endpoint=$(kubectl get endpoints -o go-template='{{range.items}}{{if eq .metadata.name "config-db"}}{{(index (index .subsets 0).addresses 0).ip}}:{{(index (index .subsets 0).ports 0).port}}{{end}}{{end}}')

  curl http://$endpoint/config_items
  ```

