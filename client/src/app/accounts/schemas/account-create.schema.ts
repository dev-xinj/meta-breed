import { z } from "zod";

export const AccountCreateSchema = z.object({
  token: z.string(),
});
