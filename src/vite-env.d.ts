/// <reference types="vite/client" />


/*
this is great for now but doesn't error out whenever the keys are missing. 
For something like that, we could create a env.ts file and validate the 
import.meta.env using a valibot schema
*/
interface ImportMetaEnv {
  readonly VITE_OMDB_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
