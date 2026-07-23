/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Digital-twin chat island — see src/scripts/twin-chat.ts.
// Public (client-exposed) env var: the Supabase Edge Function URL that
// serves the SSE chat stream. Unset in local/dev builds -> the chat island
// falls back to a canned mock (see the `// TODO(T11)` seam in twin-chat.ts).
interface ImportMetaEnv {
  readonly PUBLIC_TWIN_ENDPOINT?: string;
}

declare module '*.yaml' {
  const data: any;
  export default data;
}
declare module '*.yml' {
  const data: any;
  export default data;
}
