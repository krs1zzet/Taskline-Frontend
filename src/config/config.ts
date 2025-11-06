type AppConfig = { API_BASE: string; ENV?: string; VERSION?: string };

const fallback: AppConfig = {
  API_BASE: import.meta.env.VITE_API_BASE || "http://localhost:8080",
  ENV: import.meta.env.MODE,
  VERSION: import.meta.env.VITE_APP_VERSION || "dev"
};

export const config: AppConfig =
  (window as any).__APP_CONFIG__ ? (window as any).__APP_CONFIG__ : fallback;
