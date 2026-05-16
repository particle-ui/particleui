# Tier is derived from directory path at build time, not declared in component JSON

The `tier` field in the registry Index (e.g. `"core"`, `"particles"`, `"pro"`) is computed by the registry builder from the source file's directory path — it is not stored in individual RegistryItem JSON files. A file at `registry/react/particles/beam.json` gets `tier: "particles"` in the index; the JSON file itself has no `tier` field.

The alternative was an explicit `tier` field in each JSON file. Directory-derived tier was chosen because: (1) moving a file between tiers automatically changes its tier at next build, with no risk of the declared field drifting from the actual location; (2) the directory structure is the canonical organization artifact — declaring tier redundantly in the file creates a second source of truth.

Consequence: the `tier` field only exists in the built Index, not in individual RegistryItem files served by the API. Callers that need the tier of a specific item must either know it from context, infer it from `categories`, or fetch the index.
