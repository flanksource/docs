`config-db` allows you to transform the configuration after they've been scraped from the target. This is supported by all the scrapers.

Transformation can be useful when you want to

- hide/remove sensitive data from the scraped configuration (e.g. passwords, tokens, etc.)
- transform the scraped configuration using Javascript and [Go templates](https://pkg.go.dev/text/template).
- remove certain fields from the scraped configuration

| Field                | Description                                                                                    | Scheme                            | Required |
| -------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------- | -------- |
| [`script`](#script)  | Script to transform scrape result.                                                             | [`Script`](./script.md)           |          |
| [`exclude`](#filter) | Specify fields to remove from the config. It is useful for removing sensitive data and fields. | [`[]Filter`](./exclude.md#filter) | `false`  |
| [`mask`](#mask)      | Specify configurations to replace sensitive fields with hash functions or static string.       | [`[]Mask`](./mask.md)             | `false`  |
