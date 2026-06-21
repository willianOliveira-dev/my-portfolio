import { z } from "zod";
import * as m from "@/paraglide/messages";
import type { Locale } from "@/paraglide/runtime";

export const getContactSchema = (locale: Locale) => z.object({
  firstName: z.string().min(2, m.contact_first_name_error({}, { locale })),
  lastName: z.string().min(2, m.contact_last_name_error({}, { locale })),
  email: z.string().email(m.contact_email_error({}, { locale })),
  phone: z.string().optional(),
  message: z.string().min(10, m.contact_message_error({}, { locale })),
});
