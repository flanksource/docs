# Kubernetes Workload
This example demonstrates creating a component from the ABP Microservice Demo

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Topology
metadata:
  name: abp
spec:
  text: ABP Microservices
  icon: dotnet
  schedule: "@every 10m"
  type: DotnetApplication
  properties:
    - icon: world
      text: https://docs.abp.io/en/abp/latest/Samples/Microservice-Demo
      type: url
    - icon: aws
      text: eu-west-2
    - name: Products
      headline: true
      text: "112"
    - name: Blogs
      headline: true
      text: "15"
    - name: Visitors
      headline: true
      text: "26"
      color: red

  components:
    - type: Application
      icon: dotnet
      name: Auth Server
      selectors:
        - labelSelector: "app=auth-server"
    - type: Application
      icon: dotnet
      name: Backend Admin
      selectors:
        - labelSelector: "app=backend-admin-app"
    - type: Application
      icon: dotnet
      name: Blogging Service
      selectors:
        - labelSelector: "app=blogging-service"
    - type: Application
      icon: dotnet
      name: Identity Service
      selectors:
        - labelSelector: "app=identity-service"
    - type: Application
      icon: dotnet
      name: Product Service
    - type: Application
      icon: dotnet
      name: Website
      selectors:
        - labelSelector: "app=public-website"

    - type: Application
      icon: redis
      name: Redis
      selectors:
        - labelSelector: "app=redis"

    - type: Application
      icon: rabbitmq
      name: RabbitMQ
      selectors:
        - labelSelector: "app=rabbitmq"
    - type: Application
      icon: mongo
      name: Mongo
      selectors:
        - labelSelector: "app=mongodb"
    - type: Application
      icon: sqlserver
      name: SQL Server
```

### Standalone Canaries

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: abp-microservice
spec:
  interval: 30
  http:
    - endpoint: https://abp-sample-auth-dev.canary.lab.flanksource.com
      name: ABP Microservices demo authentication portal
      description: The authentication server included in the ABP Microservices demo
      responseCodes: [200]
    - endpoint: https://abp-sample-admin-dev.canary.lab.flanksource.com
      name: ABP Microservices demo administration interface
      description: The backend admin interface included in the ABP Microservices demo
      responseCodes: [200]
    - endpoint: https://abp-sample-dev.canary.lab.flanksource.com
      name: ABP Microservices demo public website
      description: The public website included in the ABP Microservices demo
      responseCodes: [200]
  mongodb:
    - connection: mongodb://mongodb.dev.svc:27017
      name: ABP Microservices MongoDB instance
      description: Verify that the MongoDB database used by the ABP Microservices demo is up and functioning
```
