import { FBPostItemResponse } from "../schemas/fanpage-post.schema";
import { FanpageTable } from "../types/fanpage-post.type";

export const mapperFanpagePost = (fbOject: FBPostItemResponse): FanpageTable => {
  return {
    fanpagePostUUID: fbOject?.id,
    pageUUID: fbOject?.from?.id,
    title: fbOject.message,
    created_time: fbOject.created_time,
    updated_time: fbOject.updated_time,
    status_type: fbOject.status_type,
    icon: fbOject.icon,
    totalComments: fbOject?.comments?.data.length,
  };
  // return FanpagePostSchema.parse(fbOject);
};
