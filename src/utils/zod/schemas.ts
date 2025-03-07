import {z} from 'zod';

export const symbolsSchema = z.object({
  symbols: z.record(z.string(), z.string()),
});

export const rate = z.record(z.string(), z.number());

export const favoritesSchemas = z.string();

export const requestLatestDataSchema = z.object({
  timestamp: z.number(),
  base: z.string(),
  date: z.string(),
  rates: z.record(z.string(), z.number()),
  success: z.literal(true),
});
