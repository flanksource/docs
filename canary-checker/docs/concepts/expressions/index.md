---
title: Expressions
sidebar_custom_props:
  icon: hugeicons:code
---

canary-checker can be extended using expressions in 3 ways:

1. [Display Formatting](./display-formatting) provides the ability to customize the info or error message for a health check.
2. [Health Evaluation](./health-evaluation) provides the ability to define whether a check is considered passing or failing based on the result
3. [Transforms](./transforms) allow arbitrary transformations to:
   - Split a check into multiple (e.g. If they are all received in a single JSON)
   - Modify check results (e.g. Add labels, change severity etc)
   - Change the namespace target of a check
   - Save part of the result (e.g. last log age) to be used in future checks
