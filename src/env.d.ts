/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SERVER_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
