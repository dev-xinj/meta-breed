import { z } from "zod";
export const AccountUpdateSchema = z.object({
  uuid: z.string(),
  token: z.string(),
});
