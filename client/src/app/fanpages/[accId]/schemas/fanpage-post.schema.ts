/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from 'zod';

export const FBUserSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
});

export const FBCursorSchema = z.object({
  before: z.string().optional(),
  after: z.string().optional(),
});

export const FBPagingSchema = z.object({
  cursors: FBCursorSchema.optional(),
  next: z.string().optional(),
  previous: z.string().optional(),
});
export const FBImageSchema = z.object({
  height: z.number().optional(),
  width: z.number().optional(),
  src: z.string().optional(),
});

export const FBMediaSchema = z.object({
  image: FBImageSchema.optional(),
});

export const FBAttachmentItemSchema = z.object({
  media_type: z.string().optional(),
  media: FBMediaSchema.optional(),
  type: z.string().optional(),
  url: z.string().optional(),
});

export const FBAttachmentsSchema = z.object({
  data: z.array(FBAttachmentItemSchema),
});
export const FBCommentSchema = z.object({
  id: z.string(),
  from: FBUserSchema.optional(),
  message: z.string().optional(),
  created_time: z.string(),
  like_count: z.number().optional(),
});

export const FBCommentsSchema = z.object({
  data: z.array(FBCommentSchema),
  paging: FBPagingSchema.optional(),
});
export const FBReactionsSummarySchema = z.object({
  total_count: z.number().optional(),
  viewer_reaction: z.string().optional(),
});

export const FBReactionsSchema = z.object({
  data: z.array(z.any()),
  paging: FBPagingSchema.optional(),
  summary: FBReactionsSummarySchema.optional(),
});
export const FBPrivacySchema = z.object({
  allow: z.string().optional(),
  deny: z.string().optional(),
  description: z.string().optional(),
  friends: z.string().optional(),
  value: z.string().optional(),
});
export const FBPostSchema = z.object({
  id: z.string(),
  message: z.string().optional(),
  created_time: z.string(),
  updated_time: z.string().optional(),
  from: FBUserSchema.optional(),
  privacy: FBPrivacySchema.optional(),
  status_type: z.string().optional(),
  icon: z.string().optional(),
  story: z.string().optional(),
  attachments: FBAttachmentsSchema.optional(),

  comments: FBCommentsSchema.optional(),

  reactions: FBReactionsSchema.optional(),
});
export const FBPostsResponseSchema = z.object({
  data: z.array(FBPostSchema),
  paging: FBPagingSchema.optional(),
});
export type FBPostsResponse = z.infer<typeof FBPostsResponseSchema>;
export type FBPostItemResponse = z.infer<typeof FBPostSchema>;
