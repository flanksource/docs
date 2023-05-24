### ResourceSelector

| Field           | Description                                                                       | Scheme   | Required |
| --------------- | --------------------------------------------------------------------------------- | -------- | -------- |
| `name`          | Set name for selector                                                             | `string` |          |
| `fieldSelector` | Select Kubernetes or Canary object based on the value of specified resource field | `string` |          |
| `labelSelector` | Select Kubernetes or Canary object based on label. e.g. app, canary.              | `string` |          |
