import { z } from "zod";
export const FanpageTableSchema = z.object({
  fanpagePostUUID: z.string(),
  pageUUID: z.string().optional(),
  title: z.string().optional(),
  created_time: z.string(),
  updated_time: z.string().optional(),
  status_type: z.string().optional(),
  icon: z.string().optional(),
  totalComments: z.number().optional(),

});
export type FanpageTable = z.infer<typeof FanpageTableSchema>;
