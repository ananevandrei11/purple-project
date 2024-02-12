import { emailSchema, phoneSchema, stringDefaultSchema, stringRequiredSchema } from '@/schemas';
import { z } from 'zod';

export function getCartSchema(isAuth: boolean = false) {
  return z.object({
    address: stringRequiredSchema,
    name: stringDefaultSchema,
    phone: phoneSchema,
    email: isAuth ? stringDefaultSchema : emailSchema,
    password: isAuth ? stringDefaultSchema : stringRequiredSchema
  });
}

export type FieldValues = z.infer<ReturnType<typeof getCartSchema>>;
