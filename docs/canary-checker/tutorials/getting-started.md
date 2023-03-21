# Getting Started with Canary Checker

Canary checker is a monitoring system for executing synthetic tests, providing a built-in user interface, CLI and multi-cluster and multi-instance aggregation. Canary checker is designed with multi-tenancy in mind.

You are able to write your own tests and execute them to continually verify that your applications and clusters are working the way you expect.

In this guide, you'll see how to use canary-checker to test a Postgres database in several ways, using the CLI.

## Prerequisities
For the purposes of this guide, you need a PostgreSQL instance running in Kubernetes. See the following guide on [how to install PostgreSQL](https://phoenixnap.com/kb/postgresql-kubernetes) in your Kubernetes Cluster via Helm.

## Installing the CLI

> For this guide, Docker Desktop is used to create a Kubernetes cluster on MacOS. You can create your Cluster on the environment of your choice.


The canary-checker CLI will allow you to quickly and simply execute checks that you have defined, via a single CLI command.

!!! info "Info"
    To install the CLI for preferred environment, See the [Canary-checker Installation guide](../run/#installation) for more information.


To verify whether the CLI has been installed correctly, run `canary-checker run -h` from your terminal. You should see the following output:

```console
Execute checks and return

Usage:
  canary-checker run <canary.yaml> [flags]

Flags:
      --csv                  output results in csv format
  -d, --data string          Template out each spec using the JSON or YAML data in this file
  -h, --help                 help for run
  -j, --junit                output results in junit format
  -n, --namespace string     Namespace to run canary checks in
  -o, --output-file string   file to output the results in

Global Flags:
      --db string                    Connection string for the postgres database (default "DB_URL")
      --db-trace                     Trace database queries
      --expose-env                   Expose environment variables for use in all templates. Note this has serious security implications with untrusted canaries
      --json-logs                    Print logs in json format to stderr
      --log-fail                     Log every failing check (default true)
      --log-pass                     Log every passing check
  -v, --loglevel count               Increase logging level
      --shared-library stringArray   Add javascript files to be shared by all javascript templates
```

## Creating a synthetic check for PostgreSQL

You'll define a check against our database that will connect to it, run a query against it and verify the results. Additionally, you'll see how canary-checker responds when the results are incorrect.

To get started, let’s created a directory to house our checks called `postgres-canaries`.

In that directory, create a file named `postgres-canary-local.yaml`, which will house the definition for our first check.

Add the following resource definition to our file. This is a Canary that will run the `SELECT current_schemas(true)` SQL query against our PostgreSQL instance every 30 seconds. It will also verify that the returned result is 1.

Replace the username and password with your PostgreSQL username and password, and save the file.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: postgres-succeed
spec:
  interval: 30
  postgres:
    - connection: "postgres://$(username):$(password)@127.0.0.1:5432/postgres?sslmode=disable"
      name: postgres schemas check
      auth:
        username:
          value: postgres
        password:
          value: yourpassword
      query: SELECT current_schemas(true)
      display:
        template: |
          {{- range $r := .results.rows }}
          {{- $r.current_schemas}}
          {{- end}}
      results: 1
```

The above Canary runs the query against our database, which has been port forwarded to port 5432 running on our development machine.

Run the Canary using the following command:

```bash
canary-checker run postgres-canary-local.yaml
```

You should see that canary-checker ran the test that you defined, and validated the results:

```console
2022-08-20T13:03:49.264+0200	INFO	Checking postgres-canary-local.yaml, 1 checks found
2022-08-20T13:03:49+02:00 	PASS [postgres] default/postgres-succeed/postgres schemas check duration=139 {pg_catalog,public}
2022-08-20T13:03:49.413+0200	INFO	1 passed, 0 failed in 154ms
```

Let’s modify the `results` field in our Canary definition to be `2` instead of `1`, and run the check again.

```console
2022-08-20T13:05:38.469+0200	INFO	Checking postgres-canary-local.yaml, 1 checks found
2022-08-20T13:05:38+02:00 	FAIL [postgres] default/postgres-succeed/postgres schemas check duration=130 {pg_catalog,public} Query return 1 rows, expected 2
2022-08-20T13:05:38.607+0200	INFO	0 passed, 1 failed in 145ms
```
You can see that canary-checker is able to validate that the result was not as expected, as well as provide us with contextual information about why it was incorrect.
Writing a custom check

The above check was a simple query that validated something that exists by default in a PostgreSQL database. However, a common use case for synthetic testing might be to validate the existence of some business-specific information.

Taking for instance there's a database table called `Users`, where you store the user information for your application.

You might want to run a Canary to validate whether a specific entry exists in the `Users` table.

To do this, create another Canary definition in our `postgres-canaries` directory called postgres-canary-local-does-admin-user-exist.yaml.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: postgres-succeed
spec:
  interval: 30
  postgres:
    - connection: "postgres://$(username):$(password)@127.0.0.1:5432/postgres?sslmode=disable"
      name: postgres schemas check
      auth:
        username:
          value: postgres
        password:
          value: yourpassword
      query: SELECT * from Users
      resultsFunction: '[[ if index .results 0 "username | eq "admin" ]]true[[else]]false[[end]]'
      displayTemplate: '[[ index .results 0 ]]'

```

If you run your Canary right away, using the `canary-checker run` CLI command, you'll see that it fails, because you have not created the Users table yet.

```bash
canary-checker run ../postgres-canaries/postgres-canary-local-does-admin-user-exist.yaml
```
```
2022-09-08T13:18:31.547+0200	INFO	Checking ../postgres-canaries/postgres-canary-local-does-admin-user-exist.yaml, 1 checks found
2022-09-08T13:18:31+02:00 	FAIL [postgres] default/postgres-succeed/postgres schemas check duration=126  failed to query db: pq: relation "users" does not exist
2022-09-08T13:18:31.677+0200	INFO	0 passed, 1 failed in 134ms
```

Let’s create and insert the required data into our database with the following SQL.
```sql
CREATE TABLE users(
   id int,
   username varchar(200),
   PRIMARY KEY(id)
);

insert into users (id, username) values (1, 'admin')
```
Now, running the Canary again, you see the expected behaviour occurs - and our data is validated as expected.

```bash
canary-checker run ../postgres-canaries/postgres-canary-local-does-admin-user-exist.yaml
```
```
2022-09-08T13:21:39.540+0200	INFO	Checking ../postgres-canaries/postgres-canary-local-does-admin-user-exist.yaml, 1 checks found
2022-09-08T13:21:39+02:00 	PASS [postgres] default/postgres-succeed/postgres schemas check duration=100
2022-09-08T13:21:39.647+0200	INFO	1 passed, 0 failed in 112ms
```
## Installing canary-checker as a Kubernetes operator

So far, you've been running canary-checker using the CLI, but it's recommended you install it in your cluster and deploy a few Canaries with it.

To do this, you can use the operator for canary-checker.

From your terminal, run the following command to install canary-checker (Ensure that you have the prerequisites installed on your cluster first).

```bash
kubectl apply -f https://github.com/flanksource/canary-checker/releases/download/v0.38.154/release.yaml
```

Once the operator has been installed, you should be able to run `kubectl get canary` to see any canaries that you've deployed into our namespace.

To get started using the operator, let’s deploy a simple HTTP canary to our namespace.

Create a file called `http_pass.yaml` containing the below resource definition.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http-pass
spec:
  interval: 30
  http:
    - endpoint: https://httpstat.us/200
      thresholdMillis: 3000
      responseCodes: [201, 200, 301]
      responseContent: ""
      maxSSLExpiry: 7`
```

You can then deploy this canary into our namespace using:

```bash
kubectl apply -f http_pass.yaml
```
```
canary.canaries.flanksource.com/http-pass created
```

You can then check the status of our canary by running:

```
TODO - Add the status
```

### Wrapping up

In this guide, you've seen how to get started with canary-checker and run a few synthetic tests against PostgreSQL running in Kubernetes. You've also seen how you can deploy canary-checker as a Kubernetes operator and deploy a Canary into your Kubernetes cluster to continuously monitor your systems.

In the next guide, You'll take a look at how to model an application and Kubernetes cluster using SystemTemplates, as well as how to link components together - eventually linking components to canaries.
