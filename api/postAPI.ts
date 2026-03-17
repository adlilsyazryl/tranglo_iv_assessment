import { APIRequestContext, expect } from '@playwright/test';
import { Post } from './types';

export class PostAPI {
  constructor(private request: APIRequestContext) {}

  async createPost(postData: Post): Promise<{ responseBody: Post; createdId: number }> {
    const response = await this.request.post('/posts', {
      data: postData,
    });

    expect(response.status()).toBe(201);
    expect(response.ok()).toBeTruthy();

    const responseBody = (await response.json()) as Post;

    expect(responseBody.title).toBe(postData.title);
    expect(responseBody.body).toBe(postData.body);
    expect(responseBody.userId).toBe(postData.userId);
    expect(responseBody.id).toBeDefined();

    return {
      responseBody,
      createdId: responseBody.id!,
    };
  }

  async getPost(postId: number): Promise<Post> {
    const response = await this.request.get(`/posts/${postId}`);

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    return (await response.json()) as Post;
  }

  async updatePost(postId: number, postData: Post): Promise<Post> {
    const response = await this.request.put(`/posts/${postId}`, {
      data: postData,
    });

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const responseBody = (await response.json()) as Post;

    expect(responseBody.id).toBe(postData.id);
    expect(responseBody.title).toBe(postData.title);
    expect(responseBody.body).toBe(postData.body);
    expect(responseBody.userId).toBe(postData.userId);

    return responseBody;
  }

  async deletePost(postId: number): Promise<void> {
    const response = await this.request.delete(`/posts/${postId}`);

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
  }

  async verifyDeletion(postId: number): Promise<void> {
    const response = await this.request.get(`/posts/${postId}`);
    expect([200, 404]).toContain(response.status());
  }
}