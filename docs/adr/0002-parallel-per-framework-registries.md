# Each framework has its own independent registry and index

React, Vue, and Svelte each have a separate source directory (`/registry/react/`, `/registry/vue/`, `/registry/svelte/`) and a separate published index (`/r/react/index.json`, etc.). A Vue `button` and a React `button` are distinct RegistryItems — there is no unified registry with framework variants.

The alternative was a single registry with a `framework` field per item or per file. Parallel registries were chosen because: (1) component sets differ across frameworks — not every React component has a Vue or Svelte equivalent; (2) file extensions, import styles, and dependency names differ enough that per-framework metadata is cleaner than conditional fields; (3) the registry API URL `particleui.dev/r/{fw}/{name}.json` is simpler than a query-param approach.

Consequence: adding a component in all three frameworks requires three source files and three metadata entries. Vue and Svelte coverage is currently a subset of React.
