import { z } from 'zod';

export const stringRequiredSchema = z
  .string({ required_error: 'Обязательное поле', invalid_type_error: 'Должен быть строкой' })
  .min(5, 'Обязательное поле')
  .trim();

export const stringDefaultSchema = z.string().trim().default('');
export const emailSchema = z.string().email('Некорректный email').trim();
export const phoneSchema = z
  .string({ required_error: 'Обязательное поле' })
  .max(25)
  .transform((val) => val.trim())
  .refine(
    (val) =>
      val === '' ||
      (val.length > 0 && val.match(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)),
    `Некорректный номер`
  );
