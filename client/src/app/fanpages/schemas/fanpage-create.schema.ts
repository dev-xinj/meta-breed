import { PageStatus } from "@/app/enums/page-status.enum";
import { z } from "zod";
export const FanpageCreateSchema = z.object({
  pageUUID: z.string().optional(),
  pageName: z.string().optional(),
  status: z.enum(PageStatus).optional(),
});
