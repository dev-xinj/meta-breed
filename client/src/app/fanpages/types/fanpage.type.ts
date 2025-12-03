import { z } from "zod";
import { FanpageSchema } from "../schemas/fanpage.schema";
export type Fanpage = z.infer<typeof FanpageSchema>;
