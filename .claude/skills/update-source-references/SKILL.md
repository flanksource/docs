  For all mdx/md files in @docs/canary-checker/ and @docs/mission-control/ that have `<!-- Source: ... -->` comments pointing to Go source files:

  1. Update the Source comments to use `#StructName` format without line numbers (e.g., `checks.go#HTTPCheck` not `checks.go:117#HTTPCheck`)

  2. For each documented struct, compare ALL public fields from the Go source against the documentation and:
     - Add any missing fields
     - Fix incorrect field names (check json/yaml tags - use the json/yaml tag name, not the Go field name)
     - If json/yaml tag differ from each other, warn user
     - Fix incorrect schemes/types (e.g., `Duration` vs `int`, `bool` vs `string`)
     - Fix incorrect nested structures (check if fields are inline or nested under a parent key)
     - Remove fields that don't exist in the Go struct
     - For inline embedded structs, verify which fields they provide

  3. For _canary-spec.mdx, ensure all check types from CanarySpec are listed with correct field names matching the json/yaml tags

  Pay attention to:
  - yaml tags like `yaml:"env"` mean the field name in docs should be `env`, not the Go field name
  - Inline embedded structs (e.g., `Connection`, `Description`, `Templatable`) - their fields appear at the same level
  - Pointer vs value types for nested structs
  - Deprecated fields should be marked as such
  - ignore private fields

