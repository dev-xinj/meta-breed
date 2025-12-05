import { z } from "zod";
import { AccountCreateSchema } from "../schemas/account-create.schema";

export type AccountCreate = z.infer<typeof AccountCreateSchema>;
