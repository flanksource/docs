# How to Deploy ConfigDB to Kubernetes
ConfigDB is a configuration management database (CMDB) built with developers in mind. It allows you to continuously scrape configurations from a variety of sources and traverse those configurations through a simple, searchable JSON tree.
In this tutorial, you will learn how to install and deploy ConfigDB to a Kubernetes environment using manual YAML configurations. 

## Prerequisites
This tutorial will be a hands on demonstration. To follow along, be sure to have the following:

- A kubernetes cluster or local Kubernetes environment, such as Kind, Microk8s, Minikube.
- Kubectl installed in your local machine.
- A client environment such as Ubuntu, MacOS, or Windows. 

## Deploying ConfigDB to Kubernetes Manually 
The advantage of deploying ConfigDB to Kubernetes manually is that it gives you a more in-depth understanding of application deployment on the Kubernetes environment.
You’ll create some Kubernetes resources required to manually deploy ConfigDB to Kubernetes.
Before you commence deploying ConfigDB to Kubernetes, a Postgres database is required. See the following tutorial for the [installation process](https://phoenixnap.com/kb/postgresql-kubernetes).
With a Postgres database installed, you can go ahead to deploying Config-db to Kubernetes.

- For Config-db to work properly it needs to have access to the already created Postgres database to perform migrations. Create a Secret configuration containing your Postgres database connection string. 
    ```
    $ kubectl create secret generic postgres-conn-string \
    --from-literal=conn-string="postgres://{user}:{password}@{hostname}:{port}/{database-name}"
    ```

- Create a deployment YAML file, `config-db-deployment.yaml`. This deployment file contains configurations of the Config-db deployment and provides specifications for the container such as command, arguments, environment values, and resource specifications.

    ```
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
    ```
    $ kubectl apply -f config-db-deployment.yaml
    ```
    Once done, you should get the following output:
    ```
    deployment.apps/config-db created
    ```

- To use Config-db it needs to be accessble so as to interact with the API to monitor configuration changes and other perform other operations. To do this, a Kubernetes Service resource is required. 
Create a file called `config-db-service.yaml`, add the following configurations to the file and save:

    ```
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
    
  


