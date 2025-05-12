import prisma from '@/databases';
import { CreatePostDto, UpdatePostDto } from '@/dtos/post.dto';
import { HttpException } from '@/exceptions/HttpException';
import { Post } from '@/interfaces/post.interface';
import { isEmpty } from '@/utils/util';
import { Prisma } from '@prisma/client';

class PostService {
  public async findAllPost(): Promise<Post[]> {
    return await prisma.post.findMany({ include: { author: true }, orderBy: { updatedAt: 'desc' } });
  }

  public async findPostById(postId: number): Promise<Post> {
    return await prisma.post.findUnique({ where: { id: postId } });
  }

  public async createPost(createPostDto: CreatePostDto): Promise<Post> {
    if (isEmpty(createPostDto)) throw new HttpException(400, 'Post data is empty');
    const { title, content, authorId } = createPostDto;
    if (!authorId) throw new HttpException(400, 'author id is empty');

    // 1️⃣ Check that the user exists first:
    const user = await prisma.user.findUnique({ where: { id: authorId } });
    if (!user) {
      throw new HttpException(404, `User with id=${authorId} not found`);
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      } as Prisma.postUncheckedCreateInput,
    });
    return post;
  }

  public async updatePost(postId: number, userId: number, updatePostDto: UpdatePostDto): Promise<Post> {
    if (isEmpty(updatePostDto)) throw new HttpException(400, 'Post data is empty');

    if (postId) {
      const existingPost = await prisma.post.findUnique({ where: { id: postId } });
      if (!existingPost) {
        throw new HttpException(404, `Post doesn't exist`);
      }
      if (existingPost.authorId !== userId) {
        throw new HttpException(403, `You are not allowed to update this post`);
      }
    }
    const post = await prisma.post.update({ where: { id: postId }, data: updatePostDto });
    return post;
  }

  public async deletePost(postId: number, userId: number): Promise<Post> {
    if (postId) {
      const existingPost = await prisma.post.findUnique({ where: { id: postId } });
      if (!existingPost) {
        throw new HttpException(404, `Post doesn't exist`);
      }
      if (existingPost.authorId !== userId) {
        throw new HttpException(403, `You are not allowed to update this post`);
      }
    }
    return await prisma.post.delete({ where: { id: postId } });
  }
}

export default PostService;
