import { z } from "zod";

export const AccountSchema = z.object({
  id: z.string(),
  uuid: z.string(),
  name: z.string(),
});
