---
title: Image Variants
---

Canary checker comes with 2 image variants:

| [Full](https://github.com/flanksource/canary-checker/blob/master/build/full/Dockerfile) | [Minimal](https://github.com/flanksource/canary-checker/blob/master/build/minimal/Dockerfile) |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [arkade](https://github.com/alexellis/arkade)                | [arkade](https://github.com/alexellis/arkade)                |
| kubectl                                                      | kubectl                                                      |
| stern                                                        | stern                                                        |
| jq                                                           | jq                                                           |
| yq                                                           | yq                                                           |
| [gcloud-cli](https://cloud.google.com/sdk/gcloud)            | [gcloud-cli](https://cloud.google.com/sdk/gcloud)            |
| [aws-cli](https://aws.amazon.com/cli/)                       | [aws-cli](https://aws.amazon.com/cli/)                       |
| [azure-cli](https://learn.microsoft.com/en-us/cli/azure/)    |                                                              |
| [dsq](https://github.com/multiprocessio/dsq)                 |                                                              |
| [k6](https://github.com/grafana/k6)                          |                                                              |
| java-11                                                      |                                                              |
| [jmeter](https://jmeter.apache.org/)                         |                                                              |
| [benthos](https://benthos.dev)                                       |                                                              |



You can choose which variant to use in the helm chart using:

```bash
helm install flanksource/canary-checker --set image.type=full
```



