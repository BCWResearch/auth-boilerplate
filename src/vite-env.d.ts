/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_LOGO_LIGHT: string;
    readonly VITE_LOGO_DARK: string;
    readonly VITE_BP_LIGHT: string;
    readonly VITE_BP_DARK: string;
    readonly VITE_GOOGLE_CLIENT_ID: string;
    readonly VITE_MS_CLIENT_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
