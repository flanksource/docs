# Playbook Run

A run is the execution of a Playbook consisting of a sequence of actions. A run can be trigger either

- manually
- on events (upcoming)
- on schedule (upcoming)

For example, a playbook can be executed when a health check passes or fails.

## Start Time

Every run must have a start time which is the time the run is scheduled to start. By default, the it is set to the current time.

Start time can be in future or even in the past.

## Statuses

A run can be in one of the following states:

| Status      | Description                                                                               |
| ----------- | ----------------------------------------------------------------------------------------- |
| `pending`   | This is the very initial state of the run. The run is waiting for approval at this stage. |
| `scheduled` | Once approved, the run stays in this state waiting to be executed at the schedule time.   |
| `running`   | At this stage, the run is executing.                                                      |
| `failed`    | The execution resulted in a failure.                                                      |
| `completed` | The execution succeeded.                                                                  |
| `cancelled` | The execution was cancelled.                                                              |
