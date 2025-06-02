interface EnvConfig {
  apiUrl: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

const env: EnvConfig = {
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3000",
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

export default env;
