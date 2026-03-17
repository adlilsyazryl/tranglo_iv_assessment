import { test, expect } from '@playwright/test';
import { PostsApi } from '../api/PostAPI';
import { Post } from '../api/types';

test.use({ baseURL: 'https://jsonplaceholder.typicode.com' });

test('2. API Automation - POM style', async ({ request }) => {
  const postsApi = new PostsApi(request);

  const originalPost: Post = {
    title: 'Valar Morghulis',
    body: 'All men must die',
    userId: 101,
  };

  const existingPostId = 1;

  await test.step('CREATE', async () => {
    const { createdId } = await postsApi.createPost(originalPost);
    expect(createdId).toBe(101);
  });

  await test.step('READ', async () => {
    const body = await postsApi.getPost(existingPostId);

    expect(body.id).toBe(existingPostId);
    expect(body.title).toBeTruthy();
    expect(body.body).toBeTruthy();
    expect(body.userId).toBeDefined();
  });

  await test.step('UPDATE', async () => {
    const updatedPost: Post = {
      id: existingPostId,
      title: 'Valar Dohaeris',
      body: 'All men must serve',
      userId: 1,
    };

    await postsApi.updatePost(existingPostId, updatedPost);
  });

  await test.step('VERIFY UPDATE', async () => {
    const body = await postsApi.getPost(existingPostId);

    expect(body.id).toBe(existingPostId);
    expect(body.title).toBeTruthy();
    expect(body.body).toBeTruthy();
    expect(body.userId).toBeDefined();
  });

  await test.step('DELETE', async () => {
    await postsApi.deletePost(existingPostId);
  });

  await test.step('VERIFY DELETION', async () => {
    await postsApi.verifyDeletion(existingPostId);
  });
});