import { maxLength, minLength, object, optional, string } from 'valibot';

export const patchUserSchema = object({
  displayName: optional(string([minLength(1), maxLength(32)])),
  handle: optional(string([minLength(2), maxLength(16)])),
  bio: optional(string([maxLength(120)]))
});
