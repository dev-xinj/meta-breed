import { PageStatus } from "@/app/common/enums/page-status.enum";
import { z } from "zod";

export const FanpageSchema = z.object({
  id: z.string(),
  pageUUID: z.string(),
  pageName: z.string().optional(),
  status: z.enum(PageStatus).optional(),
});
