import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { PostNotFoundException } from '../exceptions/postNotFound.exception';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async getAllPosts() {
    return this.postRepository.getByCondition({});
  }

  async getPostById(post_id: string) {
    const post = await this.postRepository.findById(post_id).catch(() => {
      throw new PostNotFoundException(post_id);
    });
    if (post) {
      await post.populate([{ path: 'user', select: '-password' }]);
      return post;
    }
    // throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async replacePost(post_id: string, data: UpdatePostDto) {
    return await this.postRepository.findByConditionAndUpdate(post_id, data);
  }

  async createPost(user: any, post: CreatePostDto) {
    post.user = user._id;
    return await this.postRepository.create(post);
  }

  async getByCategory(category_id: string) {
    return await this.postRepository.getByCondition({
      categories: {
        $elemMatch: { $eq: category_id },
      },
    });
  }

  async getByCategories(category_ids: [string]) {
    return await this.postRepository.getByCondition({
      categories: {
        $all: category_ids,
      },
    });
  }
}
