import { z } from "zod";
import { FanpageCreateSchema } from "../schemas/fanpage-create.schema";

export type FanpageCreate = z.infer<typeof FanpageCreateSchema>;
