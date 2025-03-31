---
title: Cancel Runs
sidebar_custom_props:
  icon: cancel
---

You can manually terminate running playbooks at any time through the Mission Control interface. 
You need the `playbook:cancel` permission to perform this action.

:::warning Cancellation Behavior
Cancelling a playbook marks it for termination, preventing new actions from being scheduled. However, any actions that are already in progress will continue to run until completion.
:::

## How to Cancel a Playbook Run

- Navigate to the playbook runs page
- Find the active playbook run you want to cancel
- Click the "Cancel" button in the actions menu
