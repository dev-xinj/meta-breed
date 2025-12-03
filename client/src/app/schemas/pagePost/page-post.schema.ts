import { z } from "zod";
export const PagePostSchema = z.object({
  id: z.string().optional(),
  pageUUID: z.string().optional(),
  postUUID: z.string().optional(),
  postTitle: z.string().optional(),
  createdTime: z.string().transform((v) => new Date(v)),
  updatedTime: z.string().transform((v) => new Date(v)),
  viewNum: z.number().optional(),
  viewerNum: z.number().optional(),
  followerNum: z.number().optional(),
  interactNum: z.number().optional(),
  reactionNum: z.number().optional(),
  commentNum: z.number().optional(),
  shareNum: z.number().optional(),
  saveNum: z.number().optional(),
});
