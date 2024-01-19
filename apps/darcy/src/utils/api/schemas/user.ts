import { z } from 'zod';

export const patchUserSchema = z.object({
  displayName: z.string().min(1).max(32).optional(),
  handle: z.string().min(1).max(16).optional(),
  bio: z.string().max(120).optional()
});
