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

!!! note "Note"
    *To avoid permission denied issues when deploying Config-db tries to create a role, you need to give your user **SUPER USER** privileges.* 

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

  


