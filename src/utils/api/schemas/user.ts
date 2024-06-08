import * as v from 'valibot';

export const patchUserSchema = v.object({
  bio: v.optional(v.pipe(v.string(), v.maxLength(120))),
  displayName: v.optional(v.pipe(v.string(), v.minLength(1), v.maxLength(32))),
  handle: v.optional(v.pipe(v.string(), v.minLength(2), v.maxLength(16)))
});
