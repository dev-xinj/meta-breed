/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
// const accessToken =
//   'EAAMZAgRascpkBQJNlLJavhOLVzAd2a7ZApU8JXnASDxdp7C7zWuDGk43a36YDP0QFgHZBNtaUQzqCUpLiB6Wn50uouRGmbyiIp4REAUC5jXtWfOMs7BZACfZABkEpnKCqJlGOXLgpZC5vwZBdDT8nU0O60ltx7KaiO7oZBlVR8PUJCp5BqmokS6gigpo9qRiZC8kOXOVqBSPxDzcKDBz7r1yFj3ZBuggJWkoU4FwVc0zC3EuZBs1qy6jqdSzR8ZD';

@Injectable()
export class ApiFacebook {
  constructor(private readonly httpService: HttpService) {}

  private readonly accessToken = process.env.FB_ACCESS_TOKEN; // không hardcode

  async findAllPosts(): Promise<any> {
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };
    const params = {
      fields: 'id,message,from,created_time,permalink_url,full_picture',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(
          'https://graph.facebook.com/v24.0/807529795786209/posts',
          { headers, params },
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
