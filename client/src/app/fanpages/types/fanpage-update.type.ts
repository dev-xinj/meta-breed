import { z } from "zod";
import { FanpageUpdateSchema } from "../schemas/fanpage-update.schema";
export type FanpageUpdate = z.infer<typeof FanpageUpdateSchema>;
