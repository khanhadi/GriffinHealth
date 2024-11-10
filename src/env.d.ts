/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
  readonly PUBLIC_OPENAI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
