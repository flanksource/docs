There are numerous events in Mission Control that you can subscribe to get notifications. Here is the complete list of all events:

| Category                                                                 | event                        | Description                                                                                |
| ------------------------------------------------------------------------ | ---------------------------- | ------------------------------------------------------------------------------------------ |
| [Health Check](../events/health-checks.md)                               | `check.passed`               | when a previously failing check passes                                                     |
|                                                                          | `check.failed`               | when a previously passing check fails                                                      |
| [Incident](../events/incidents.md#incidents)                             | `incident.created`           | when an incident is created                                                                |
| [Incident Statuses](../events/incidents.md#status)                       | `incident.status.<status>`   | When an incident's status changes. See the [list of statuses](./incident/overview/#status) |
| [Incident Comment](../events/incidents.md#comments)                      | `incident.comment.added`     | When a new comment is added to an incident.                                                |
| [Incident Responder](../events/incidents.md#responders)                  | `incident.responder.created` | when a responder is added to an incident                                                   |
|                                                                          | `incident.responder.removed` | when a responder is removed from an incident                                               |
| [Incident Definition of Done](../events/incidents.md#definition-of-done) | `incident.dod.added`         | when a dod is added                                                                        |
|                                                                          | `incident.dod.removed`       | when an existing dod is removed                                                            |
|                                                                          | `incident.dod.passed`        | when a previously failing dod passes                                                       |
|                                                                          | `incident.dod.regressed`     | when a previously passing dod fails                                                        |
| [Component](../events/components.md)                                     | `component.status.<status>`  | When a component's status changes                                                          |
