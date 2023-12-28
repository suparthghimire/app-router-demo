import Redis from "ioredis";

export const redis = new Redis("redis://localhost:6379");

export const keys_prefixes = {
  USER: "user:",
} as const;
