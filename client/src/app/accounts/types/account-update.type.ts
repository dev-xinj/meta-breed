import { z } from "zod";
import { AccountUpdateSchema } from "../schemas/account-update.schema";

export type AccountUpdate = z.infer<typeof AccountUpdateSchema>;
