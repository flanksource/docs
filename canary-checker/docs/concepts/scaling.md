# Scaling Canaries up/down

Canaries can be scaled up or down just like other kubernetes resources. However, scaling to more than one replica is identical to having just one replica. In other words, scaling a canary can be thought of as a mechanism to turn on/off the canary.

## Example

1. List all the canaries

```bash
kubectl get canaries -o wide
# NAME                REPLICAS   INTERVAL   STATUS   LAST CHECK   UPTIME 1H        LATENCY 1H   LAST TRANSITIONED  ...
# folder-pass         1          300        Failed   34s          0/35 0%          16ms
# folder-pass-empty   1          300        Passed   34s          37/37 (100.0%)   0ms
# s3-bucket-pass      1          30         Failed   3s           0/358 0%         1s
```

2. Scale one of the canaries to 10 replicas

```bash
kubectl scale --replicas=10 canaries.canaries.flanksource.com folder-pass
# canary.canaries.flanksource.com/folder-pass scaled
```

```bash
kubectl get canaries folder-pass -o wide
# NAME          REPLICAS   INTERVAL   STATUS   LAST CHECK   UPTIME 1H   LATENCY 1H   LAST TRANSITIONED   MESSAGE   ERROR
# folder-pass   10         300        Failed   3m13s        0/35 0%     16ms
```

3. Scale it down to 0 replicas

```bash
kubectl scale --replicas=0 canaries.canaries.flanksource.com folder-pass
# canary.canaries.flanksource.com/folder-pass scaled
```

```bash
kubectl get canaries folder-pass -o wide
# NAME          REPLICAS   INTERVAL   STATUS   LAST CHECK   UPTIME 1H   LATENCY 1H   LAST TRANSITIONED   MESSAGE   ERROR
# folder-pass   0         300        Failed   3m13s        0/35 0%     16ms
```

This effectively stops the canary from running.
