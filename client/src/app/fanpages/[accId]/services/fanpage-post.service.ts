import http from "@/components/lib/http";
import {
  ResponseDataSchema
} from "../../schemas/response.schema";
import {
  FBPostsResponse,
  FBPostsResponseSchema,
} from "../schemas/fanpage-post.schema";
const BASE_URL = "http://localhost:3000/posts";

export const findAllPagePost = async (
  pageUUID: string
): //  => {
Promise<FBPostsResponse> => {
  const response = await http.get(`${BASE_URL}/list/${pageUUID}`);
  const result = ResponseDataSchema.parse(response.payload);
  if (result.success) {
    return FBPostsResponseSchema.parse(result.data);
  } else {
    throw Error;
  }
  //   return response.payload;
};
