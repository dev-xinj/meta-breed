import { z } from "zod";
export const ResponseDataSchema = z.object({
  success: z.boolean().optional(),
  statusCode: z.number().optional(),
  message: z.string().optional(),
  data: z.any().optional(),
});

export type ResponseData = z.infer<typeof ResponseDataSchema>;
