There are numerous events in Mission Control that you can subscribe to get notifications. Here is the complete list of all events:

| Category                    | event                        | Description                                                                                |
| --------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------ |
| Health Check                | `check.passed`               | when a previously failing check passes                                                     |
|                             | `check.failed`               | when a previously passing check fails                                                      |
| Incident                    | `incident.created`           | when an incident is created                                                                |
|                             | `incident.status.<status>`   | When an incident's status changes. See the [list of statuses](./incident/overview/#status) |
|                             | `incident.comment.added`     | When a new comment is added to an incident.                                                |
| Incident Responder          | `incident.responder.created` | when a responder is added to an incident                                                   |
|                             | `incident.responder.removed` | when a responder is removed from an incident                                               |
| Incident Definition of Done | `incident.dod.added`         | when a dod is added                                                                        |
|                             | `incident.dod.removed`       | when an existing dod is removed                                                            |
|                             | `incident.dod.passed`        | when a previously failing dod passes                                                       |
|                             | `incident.dod.regressed`     | when a previously passing dod fails                                                        |
| Component                   | `component.status.<status>`  | When a component's status changes                                                          |
