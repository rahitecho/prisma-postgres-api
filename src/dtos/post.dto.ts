import { z } from 'zod';

// Schema for creating a post
export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().optional(),
  authorId: z.number().int().positive('Invalid authorId'),
});

// Schema for updating a post (all fields optional)
export const updatePostSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
});

// Schema for what you return in responses
export const postResponseSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  content: z.string().nullable(),
  published: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  authorId: z.number().int(),
});

// If you include the author object:
export const userResponseSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string().email(),
});

export const postWithAuthorSchema = postResponseSchema.extend({
  author: userResponseSchema,
});

// Inferred TypeScript types:
export type CreatePostDto = z.infer<typeof createPostSchema>;
export type UpdatePostDto = z.infer<typeof updatePostSchema>;
export type PostResponseDto = z.infer<typeof postResponseSchema>;
export type PostWithAuthor = z.infer<typeof postWithAuthorSchema>;
