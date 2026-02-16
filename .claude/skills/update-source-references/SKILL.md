For all mdx/md files in @docs/canary-checker/ and @docs/mission-control/ that have `<!-- Source: ... -->` comments pointing to Go source files:

1. Update the Source comments to use `#StructName` format without line numbers (e.g., `checks.go#HTTPCheck` not `checks.go:117#HTTPCheck`)

2. For each documented struct, compare ALL public fields from the Go source against the documentation and:
   - Add any missing fields
   - Fix incorrect field names (check json/yaml tags - use the json tag name, not the Go field name)
   - If json/yaml tags differ from each other, prefer the json tag and warn user
   - Fix incorrect schemes/types (e.g., `Duration` vs `int`, `bool` vs `string`)
   - Fix incorrect nested structures (check if fields are inline or nested under a parent key)
   - Remove fields that don't exist in the Go struct
   - For inline embedded structs, verify which fields they provide

3. **For nested struct types (like `ExecConnections`, `GitConnection`, etc.), you MUST:**
   - Find the actual struct definition in the codebase (may be in different packages like `duty/connection/`)
   - Document ALL fields from that struct, not just the ones currently in docs
   - Follow type references across packages to get complete field lists

4. For \_canary-spec.mdx, ensure all check types from CanarySpec are listed with correct field names matching the json tags

Pay attention to:

- Use json tags as the canonical field name (e.g., `json:"env"` means field name in docs should be `env`)
- If yaml and json tags differ, use json tag and warn the user about the discrepancy
- Inline embedded structs (e.g., `Connection`, `Description`, `Templatable`) - their fields appear at the same level
- Pointer vs value types for nested structs
- Deprecated fields should be marked as such
- Ignore private fields
- Connection types may be defined in `modules/duty/connection/` not just in the check's own file - always trace the import path to find the actual struct definition
