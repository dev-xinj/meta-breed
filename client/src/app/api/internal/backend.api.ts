// src/services/facebook.service.ts

import http from "@/components/lib/http";
import { HttpError } from "@/components/lib/http";
const BASE_URL = "http://localhost:3000";

export const BackendApi = {
  async getPagePosts(pageId: string) {
    try {
      const res = await http.get<{ data: any[]; paging: any }>(
        `${BASE_URL}/posts/list/${pageId}`
      );
      console.log(res.payload);
      return res.payload;
    } catch (e) {
      if (e instanceof HttpError) {
        console.error("Facebook API error:", e.status, e.payload);
      }
      throw e;
    }
  },

  async savePage(pageId: string) {
    try {
      const res = await http.get<{ data: any[]; paging: any }>(
        `${BASE_URL}/posts/list/${pageId}`
      );
      console.log(res.payload);
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
