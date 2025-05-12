import { CreatePostDto, UpdatePostDto } from '@/dtos/post.dto';
import { Post } from '@/interfaces/post.interface';
import PostService from '@/services/post.service';
import { NextFunction, Request, Response } from 'express';

class PostController {
  public postService = new PostService();

  public getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllPost: Post[] = await this.postService.findAllPost();
      res.status(200).json({ data: findAllPost, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getPostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId: number = parseInt(req.params.id);
      const post: Post = await this.postService.findPostById(postId);
      res.status(200).json({ data: post, message: 'findById' });
    } catch (error) {
      next(error);
    }
  };

  public createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postData: CreatePostDto = req.body;
      const createPostData: Post = await this.postService.createPost(postData);
      res.status(201).json({ data: createPostData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: number = (req.user as { id: number }).id;
      const postId: number = parseInt(req.params.id);
      const postData: UpdatePostDto = req.body;
      const updatePostData: Post = await this.postService.updatePost(postId, userId, postData);
      res.status(201).json({ data: updatePostData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: number = (req.user as { id: number }).id;
      const postId: number = parseInt(req.params.id);
      const deletePostData: Post = await this.postService.deletePost(postId, userId);

      res.status(200).json({ data: deletePostData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default PostController;
