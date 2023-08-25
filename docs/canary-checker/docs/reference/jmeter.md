---
title: Jmeter
---

# <Icon name="jmeter"/> JMeter

<Standard/>

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
| `*` | All other common fields | [*Common*](common) | |
