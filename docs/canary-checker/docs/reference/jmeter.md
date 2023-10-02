---
title: Jmeter
---

# <Icon name="jmeter"/> JMeter

<Standard/><FullImage/>

This check will execute the JMeter CLI to execute the JMX test plan on the specified host.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: jmeter-check
spec:
  interval: 30
  jmeter:
    - name: jmeter check
      url: 192.168.1.5
      jmx:
        valueFrom:
          configMapKeyRef:
            name: jmeter-config
            key: sample-test.jmx
      port: 1099
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`jmx`** | Jmx defines the ConfigMap or Secret reference to get the JMX test plan | [*EnvVar*](../../concepts/authentication/#envvar) | Yes |
| `properties` | Properties defines the local JMeter properties | *\[\]string* |  |
| `responseDuration` | duration  under which the all the test should pass | *int* |  |
| `systemProperties` | SystemProperties defines the Java system property | *\[\]string* |  |
| `host` | Host is the server against which test plan needs to be executed | *string* | |
| `port` | Port on which the server is running | *int32* | |
| **`name`**    | Name of the check, must be unique within the canary         | `string`                                     | Yes      |
| `description` | Description for the check                                   | `string`                                     |          |
| `icon`        | Icon for overwriting default icon on the dashboard          | `string`                                     |          |
| `labels`      | Labels for check                                            | `map[string]string`                          |          |
| `test`        | Evaluate whether a check is healthy                         | [`Expression`](/concepts/health-evaluation)  |          |
| `display`     | Expression to change the formatting of the display          | [`Expression`](/concepts/display-formatting) |          |
| `transform`   | Transform data from a check into multiple individual checks | [`Expression`](/concepts/transforms)          |          |
| `metrics`     | Metrics to export from                                      | [`[]Metrics`](/concepts/metrics-exporter)    |          |
