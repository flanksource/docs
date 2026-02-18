Mission Control is Flanksource's Kubernetes-native Internal Developer Platform.

Use this file as an entry point to product documentation for architecture, installation, integrations, user guides, and references.

**Architecture**

Mission Control has a micro-service architecture with a shared data source with multiple deployment models.

1. CLI
2. Kubernetes (Helm Chart)
3. SaaS

**Communication Model**

Communication between services happens in 3 ways:

1. **Database** - A shared database with interface library enables services to query data that other services own by directly hitting the database using an interface that a shared library provides.
2. **Messaging** - Mission Control uses a Postgres-based message bus; database triggers insert events into queues that various services consume.
3. **HTTP/REST** - Services use this model when they need to interact with systems outside the DB (e.g., the APM hub connects to log stores to retrieve logs).

**Postgres**

Postgres is the only data store used by Mission Control and relies heavily on JSON and queuing support in Postgres.
This limits the dependencies and complexity especially when self-hosting.

All services use a shared database and model via the [duty](https://github.com/flanksource/duty) project. This provides the following benefits:

- Limit RPC calls improving latency and performance
- Services can run with slightly different versions of the library, limiting the need for coordinated migrations
- Library updates happen automatically using dependabot
