import { z } from "zod";
import { AccountSchema } from "../schemas/account.schema";

export type Account = z.infer<typeof AccountSchema>;
