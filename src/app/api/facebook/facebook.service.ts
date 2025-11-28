// src/services/facebook.service.ts

import http from "@/components/lib/http";
import { HttpError } from "@/components/lib/http";
const BASE_URL = "https://graph.facebook.com/v24.0";

const ACCESS_TOKEN =
  "EAAMZAgRascpkBQHwdMFxaTwTdlIU8T122NCkmtLj2jObFGw3TB8JZCWZCtRDjVuKQ2kTJAZC80iszf8mAf2IJQdtYdNGgsuGWRZAbUqXKLp3oFRHSuIEg74zD2Hc4LpNRpqXQypHeemgSscZCuWF4MumCn2RDpjI9DxTKRhDsZB2FJUwJlqIT1JZB7RZAonXCxLPRTnVWjmnwNHeZCsITSlw4h65tGwcYRTcAfj0sjz1Pm8tPZCU15Vkb4ptltZAVwZDZD";

const defaultHeaders = {
  Authorization: `Bearer ${ACCESS_TOKEN}`,
};

export const facebookService = {
  async getPagePosts(pageId: string) {
    try {
      const res = await http.get<{ data: any[]; paging: any }>(
        `${BASE_URL}/${pageId}/posts`,
        {
          fields:
            "id,message,from,created_time,permalink_url,full_picture",
        },
        defaultHeaders
      );
      return res.payload;
    } catch (e) {
      if (e instanceof HttpError) {
        console.error("Facebook API error:", e.status, e.payload);
      }
      throw e;
    }
  },

  // Bạn có thể tạo thêm API khác như:
  // getPostDetail(postId: string) {}
  // getComments(postId: string) {}
};
