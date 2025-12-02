/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { url } from 'inspector';
import { firstValueFrom } from 'rxjs';
import { FBPostsResponse } from 'src/global/schema/pagePost.schema';
// const accessToken =
//   'EAAMZAgRascpkBQDaZBtM0eZCZAteucL3soQqr73Edg7ebNVVAVwOBxz0U96aumhBrZC8gkxZAlDNlY4GZCjunhZAMVJnfFfgSkVLbpz9V2Pfv1XXpNsezfuSNZBXlPakpzVv3Y5s3bSZBaK4pSy20pq9hAEtzmSo3DxfnQyZCYk7F1n8V8EdkpeH4Clc1mLdpStbqeaAzZBzqthKQoPFfOa5rKaoceNngfzJg96Xc8GhlH5piVaA8BShlswsnNd1';

@Injectable()
export class ApiFacebookService {
  private readonly baseURL = 'https://graph.facebook.com/v24.0';
  constructor(private readonly httpService: HttpService) {}

  // private readonly accessToken = process.env.FB_ACCESS_TOKEN; // không hardcode

  async findAllPosts(
    endpoint: string,
    token: string,
    fields?: string,
  ): Promise<FBPostsResponse> {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const params = {
      // fields: 'id,message,from,created_time,permalink_url,full_picture',
      fields: fields,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(`https://graph.facebook.com/v24.0/${endpoint}`, {
          headers,
          params,
        }),
      );
      return response.data;
    } catch (error: any) {
      console.error(
        'Facebook API error',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  async commentsBatch(
    endpoint: string,
    token: string,
    body?: URLSearchParams,
    headers?: Record<string, string>,
  ): Promise<any> {
    //
    const baseHeaders: Record<string, string> = {
      ...(headers || {}),
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const baseBody = new URLSearchParams();
    body?.forEach((value, key) => baseBody.append(key, value));
    try {
      const extractURL = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.baseURL}${extractURL}`,
          baseBody.toString(),
          {
            headers: baseHeaders,
          },
        ),
      );
      return response.data;
    } catch (error: any) {
      console.error(
        'Facebook API error',
        error.response?.data || error.message,
      );
      throw error;
    }
  }
}

/* */
