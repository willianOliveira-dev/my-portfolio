import { z } from "zod";
import { getContactSchema } from "./contact.schema";

export type ContactFormValues = z.infer<ReturnType<typeof getContactSchema>>;
