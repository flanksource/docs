# Filtering
Customizing notifications is made possible through the use of filters, which are driven by CEL expressions (Check Execution Language). You can learn more about CEL expressions on the [CEL-spec GitHub page](https://github.com/google/cel-spec).

The cel expression receives different input variables based on the event type. To determine which variables are available, refer to the corresponding event details in the [events](../concepts/events.md) section.

## Examples

```yaml
# Filter HTTP checks only
events:
  - check.passed
filter: check.type == 'http'
```

```yaml
# Filter HTTP checks those that have failed for more than 5 times in the last 1 hour
events:
  - check.failed
filter: check.type == 'http' && check.uptime.failed > 5
```
