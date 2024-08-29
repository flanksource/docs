---
title: Exec
---

# <Icon name="console" /> Exec

Run a script and use the results to generate a topology.

- Bash scripts
- Powershell scripts

```yaml title="exec-lookup.yml"
---
apiVersion: canaries.flanksource.com/v1
kind: Topology
metadata:
  name: server
spec:
  type: Server
  icon: server
  schedule: '@every 30s'
  components:
    - name: Server
      icon: server
      type: server
      // highlight-start
      lookup:
        exec:
          - script: |
                mem_total=$(free -g | awk 'NR==2{printf "%d", $2}')
                mem_available=$(free -g | awk 'NR==2{printf "%d", $7}')
                kernel_version=$(uname -r)
                distro=$(awk -F'=' '/^NAME/ {print $2}' /etc/os-release | tr -d '"')
                hostname=$(hostname)
                ip_addresses=$(ip addr show | awk '/inet / {printf "%s %s\n", $NF, $2}')

                printf '{"memory":"%dGiB/%dGiB","kernel_version":"%s","distro":"%s","hostname":"%s","ip_addresses":"%s"}\n' "$mem_available" "$mem_total" "$kernel_version" "$distro" "$hostname" "$ip_addresses"
            display:
              expr: |
                [{
                  "name": results.stdout.JSON().hostname,
                  "properties": [
                    {"name": "Memory", "text": results.stdout.JSON().memory},
                    {"name": "Kernel", "text": results.stdout.JSON().kernel_version},
                    {"name": "Distro", "text": results.stdout.JSON().distro},
                    {"name": "ip_addresses", "text": results.stdout.JSON().ip_addresses },
                  ]
                }].toJSON()
      // highlight-end
```

| Field        | Description                                                                                                                                                    | Scheme                               | Required |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | -------- |
| **`script`** | Script can be a inline script or a path to a script that needs to be executed. On windows executed via powershell and in darwin and Linux executed using bash. | `Path`, `Bash`or`Powershell`         | Yes      |
| `display`    | Template to display server response in text (overrides default bar format for UI)                                                                              | [_Template_](../concepts/templating) |          |
| `labels`     | Labels for the check                                                                                                                                           | Labels                               |          |
| `transform`  | Template to transform results by excluding or including certain fields in result                                                                               | [_Template_](../concepts/templating) |          |

## Results

The `results` variable in the template will contain the following fields

| Field      | Description             | Scheme   |
| ---------- | ----------------------- | -------- |
| `stdout`   | stdout from the script  | `string` |
| `stderr`   | stderr from the script  | `string` |
| `exitCode` | exit code of the script | `int`    |
