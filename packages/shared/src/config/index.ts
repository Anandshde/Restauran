export interface AppConfig {
  mode: "demo" | "production";
  api: {
    baseUrl: string;
    timeout: number;
  };
  features: {
    realPayments: boolean;
    adminAuth: boolean;
    cloudinaryUpload: boolean;
    realDatabase: boolean;
    socketIO: boolean;
  };
  demo: {
    seedData: boolean;
    mockDelay: number;
    resetEnabled: boolean;
  };
}

// Environment-based configuration
const getConfig = (): AppConfig => {
  const mode =
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_APP_MODE === "demo"
      ? "demo"
      : (process.env.NEXT_PUBLIC_APP_MODE as "demo" | "production") ||
        "production";

  const baseConfig: AppConfig = {
    mode,
    api: {
      baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
      timeout: 10000,
    },
    features: {
      realPayments: mode === "production",
      adminAuth: mode === "production",
      cloudinaryUpload: mode === "production",
      realDatabase: mode === "production",
      socketIO: true, // Both modes support real-time updates
    },
    demo: {
      seedData: mode === "demo",
      mockDelay: 800, // Simulate network delay
      resetEnabled: mode === "demo",
    },
  };

  return baseConfig;
};

export const config = getConfig();

// Utility functions
export const isDemo = (): boolean => config.mode === "demo";
export const isProduction = (): boolean => config.mode === "production";

// Feature flags
export const useRealPayments = (): boolean => config.features.realPayments;
export const useAdminAuth = (): boolean => config.features.adminAuth;
export const useCloudinaryUpload = (): boolean =>
  config.features.cloudinaryUpload;
export const useRealDatabase = (): boolean => config.features.realDatabase;
export const useSocketIO = (): boolean => config.features.socketIO;

// Demo utilities
export const shouldSeedData = (): boolean => config.demo.seedData;
export const getMockDelay = (): number => config.demo.mockDelay;
export const canResetDemo = (): boolean => config.demo.resetEnabled;

// API utilities
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = config.api.baseUrl.replace(/\/$/, "");
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

// Environment helpers
export const isDevelopment = (): boolean =>
  process.env.NODE_ENV === "development";
export const isClient = (): boolean => typeof window !== "undefined";
export const isServer = (): boolean => typeof window === "undefined";

// Debug utilities
export const logConfig = (): void => {
  if (isDevelopment()) {
    console.log("🔧 App Configuration:", {
      mode: config.mode,
      features: config.features,
      api: config.api,
      demo: config.demo,
    });
  }
};
