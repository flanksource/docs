# Definition of done

Incidents can be programatically resolved using done definition. When an evidence is added to an incident, a done definition can be created based on the attached object of the evidence.

![Done definition form](/img/done-definition-form.png)

Done definitions are checked periodically every 5 minutes.

## Examples:

### A. Using config analysis

The following expression for a done definition using a config analysis, will mark the incident as resolved if the linked config analysis is resolved.

```
analysis.status == 'resolved'
```

### B. using config item

Assume an incident where a postgres database fails to accept more than 20 concurrent connections. We can setup a done definition on the related postgres config as follows

```
config.max_connections > 30
```

Now, whenever the postgres config is modified to have more than 30 max connections, the incident will be marked as resolved automatically

### C. Using health check

Assume an incident where the reverse proxy is returning too many 5XX errors. An evidence is provided linking a health check for the backend API service.
We can setup a done definition as follows

```
check.status == 'healthy'

# OR

check.status == "healthy" && check.age > duration("30s")
```
