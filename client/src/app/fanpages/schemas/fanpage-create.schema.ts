import { PageStatus } from "@/app/enums/page-status.enum";
import { z } from "zod";
export const FanpageCreateSchema = z.object({
  pageUUID: z.string(),
  pageName: z.string(),
  accessToken: z.string(),
  status: z.enum(PageStatus).optional(),
});
